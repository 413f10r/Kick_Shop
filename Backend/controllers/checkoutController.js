import connection from "../data/db.js";
import { sendOrderConfirmationEmail } from "../utils/mailer.js"; // Importa la funzione per inviare l'email

// Funzione per validare il formato dell'email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Verifica se l'email rispetta il formato corretto
}

// Funzione per memorizzare un nuovo ordine nel database
function storeOrder(req, res) {
  // Estrai i dati necessari dalla richiesta
  const {
    userName,
    userSurname,
    userEmail,
    addressShipping,
    addressInvoice,
    telephone,
    city,
    province,
    carts
  } = req.body;

  // Controlla se l'email fornita è valida
  if (!isValidEmail(userEmail)) {
    return res.status(400).json({
      error: "Email non valida",
      details: "Inserire un indirizzo email valido"
    });
  }

  // Estrai gli ID dei prodotti e le relative quantità dal carrello
  const productIds = carts.map(cart => cart.id_product);
  const productQuantities = carts.map(cart => cart.quantity);

  // Query SQL per verificare la disponibilità dei prodotti
  const verifyAvailabilitySql = `SELECT id, availability, name FROM products WHERE id IN (?);`;

  // Esegui la query di disponibilità dei prodotti
  connection.query(verifyAvailabilitySql, [productIds], (err, availabilityResults) => {
    if (err) {
      return res.status(500).json({
        error: "Errore nel verificare la disponibilità del prodotto",
        details: err.message
      });
    }

    // Flag per determinare se c'è un prodotto fuori stock
    let outOfStock = false;
    // Ciclo per verificare la disponibilità di ciascun prodotto
    for (let i = 0; i < availabilityResults.length; i++) {
      if (availabilityResults[i].availability < productQuantities[i]) {
        // Se la quantità richiesta supera quella disponibile, restituisci errore
        return res.status(400).json({
          error: `La quantità richiesta per il prodotto ${availabilityResults[i].name} supera la disponibilità (${availabilityResults[i].availability} disponibili)`
        });
      }
    }

    // Se arriviamo qui, significa che tutti i prodotti sono disponibili, quindi calcoliamo il totale
    const priceProductSql = `SELECT * FROM products WHERE id IN (?);`;

    connection.query(priceProductSql, [productIds], (err, priceResults) => {
      if (err) {
        return res.status(500).json({
          error: "Errore nel recupero dei prezzi",
          details: err.message
        });
      }

      let totalPrice = 0;
      // Calcola il prezzo totale sommando i prezzi dei prodotti moltiplicati per le loro quantità
      priceResults.forEach((product, index) => {
        totalPrice += product.price * productQuantities[index];
      });

      const shippingCost = totalPrice > 200 ? 0 : 25;
      const grandTotal = totalPrice + shippingCost;

      // Query SQL per inserire l'ordine nel database
      const insertOrderSql = `
        INSERT INTO orders (
          user_name, user_surname, user_email, address_shipping, address_invoice, 
          telephone, city, province, carts, total
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      // Esegui l'inserimento dell'ordine
      connection.query(insertOrderSql, [
        userName, userSurname, userEmail, addressShipping,
        addressInvoice, telephone, city, province, JSON.stringify(carts), totalPrice
      ], (err, results) => {
        if (err) {
          return res.status(500).json({
            error: "Errore nell'inserimento dell'ordine",
            details: err.message
          });
        }

        // Ottieni l'ID dell'ordine appena creato
        const orderId = results.insertId;

        // Crea l'elenco dei prodotti da inserire nella tabella "order_product"
        const orderProductsDb = priceResults.map((product, index) => ([
          orderId,
          product.id,
          product.name,
          productQuantities[index],
          product.price
        ]));

        const orderProductsForEmail = priceResults.map((product, index) => ({
          name: product.name,
          quantity: productQuantities[index],
          price: product.price
        }));



        // Query SQL per inserire i dettagli dell'ordine nella tabella "order_product"
        const insertOrderProductSql = `INSERT INTO order_product (order_id, product_id, name_product, quantity, unit_price) VALUES ?`;

        // Esegui l'inserimento dei dettagli dell'ordine
        connection.query(insertOrderProductSql, [orderProductsDb], (err) => {
          if (err) {
            return res.status(500).json({
              error: "Errore nell'inserimento dei dettagli dell'ordine",
              details: err.message
            });
          }

          // Aggiorna la disponibilità dei prodotti nel database (decrementando la quantità disponibile)
          const subAvSql = `UPDATE products p
            JOIN order_product op ON p.id = op.product_id
            SET p.availability = p.availability - op.quantity
            WHERE op.order_id IN (?)`;

          connection.query(subAvSql, [orderId], (err, subResults) => {
            console.log(productIds); // Log per debug

            if (err) {
              return res.status(500).json({
                error: "Errore nell'aggiornamento della disponibilità dei prodotti",
                details: err.message
              });
            }
             
            // Invia l'email di conferma
            sendOrderConfirmationEmail(userEmail, orderId, totalPrice, userName, userSurname, city, province, telephone, addressShipping, orderProductsForEmail );

            // Risposta finale: ordine inserito con successo e disponibilità aggiornata
            res.status(201).json({
              status: "success",
              message: "Ordine aggiunto con successo",
              total: totalPrice,
              shippingCost: shippingCost,
              grandTotal: grandTotal,
              differenza: subResults // Restituisce l'aggiornamento della disponibilità dei prodotti
            });
          });
        });
      });
    });
  });
}

// Esportiamo la funzione per essere utilizzata in altri file
export default storeOrder;
