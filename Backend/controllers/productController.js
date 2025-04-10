import connection from "../data/db.js";



// Funzione per ottenere la lista di tutti i prodotti con immagini e taglie
function index(req, res) {
  const productSql = 'SELECT * FROM products';
  const imagesSql = 'SELECT * FROM images WHERE product_id = ?';
  const sizesSql = 'SELECT * FROM sizes WHERE product_id = ?';

  // Esegue la query per ottenere tutti i prodotti
  connection.query(productSql, (err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Errore lato server nella funzione INDEX' });
    }

    // Se non ci sono prodotti, restituisce un errore 404
    if (products.length === 0) {
      return res.status(404).json({ error: 'Nessun prodotto trovato' });
    }

    let count = 0;
    
    // Per ogni prodotto trovato, recupera le immagini e le taglie
    products.forEach((product, index) => {
      connection.query(imagesSql, [product.id], (err, imagesResults) => {
        if (err) {
          return res.status(500).json({ error: 'Errore lato server nel recupero immagini' });
        }
        
        // Aggiunge le immagini al prodotto, costruendo gli URL corretti
        product.images = imagesResults.map((image, idx) => ({
          ...image,
          image_url: `${req.imagePath}${product.slug}-${idx + 1}.webp`,
        }));

        // Recupera le taglie associate al prodotto
        connection.query(sizesSql, [product.id], (err, sizesResults) => {
          if (err) {
            return res.status(500).json({ error: 'Errore lato server nel recupero taglie' });
          }
          product.sizes = sizesResults;
          count++;

          // Una volta elaborate tutte le richieste asincrone, restituisce la risposta
          if (count === products.length) {
            res.json(products);
          }
        });
      });
    });
  });
}

// Funzione per ottenere un singolo prodotto tramite slug, con immagini e taglie
function show(req, res) {
  const { slug } = req.params; // Recupera lo slug dalla richiesta
  const productSql = 'SELECT * FROM products WHERE slug = ?';
  const imagesSql = 'SELECT * FROM images WHERE product_id = ?';
  const sizesSql = 'SELECT * FROM sizes WHERE product_id = ?';

  // Esegue la query per ottenere il prodotto corrispondente allo slug
  connection.query(productSql, [slug], (err, productResults) => {
    if (err) {
      return res.status(500).json({ error: 'Errore lato server nella funzione SHOW' });
    }

    // Se il prodotto non esiste, restituisce un errore 404
    if (productResults.length === 0) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    const product = productResults[0];

    // Recupera le immagini associate al prodotto
    connection.query(imagesSql, [product.id], (err, imagesResults) => {
      if (err) {
        return res.status(500).json({ error: 'Errore lato server nel recupero immagini' });
      }
      
      // Aggiunge le immagini al prodotto con gli URL corretti
      product.images = imagesResults.map((image, idx) => ({
        ...image,
        image_url: `${req.imagePath}${product.slug}-${idx + 1}.webp`,
      }));

      // Recupera le taglie associate al prodotto
      connection.query(sizesSql, [product.id], (err, sizesResults) => {
        if (err) {
          return res.status(500).json({ error: 'Errore lato server nel recupero taglie' });
        }
        product.sizes = sizesResults;
        res.json(product); // Restituisce il prodotto con immagini e taglie
      });
    });
  });
}




// Esporta le funzioni per essere utilizzate in altri file
export { index, show };
