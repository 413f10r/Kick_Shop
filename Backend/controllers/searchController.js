import connection from "../data/db.js"

function search(req, res) {
  const searchTerm = req.params.name || '';
  const { sortBy = 'name', order = 'asc' } = req.query; // Recupera i parametri di ordinamento

  // Query per selezionare i prodotti
  let sql = 'SELECT * FROM products';
  const imagesSql = 'SELECT * FROM images WHERE product_id = ?';
  const sizesSql = 'SELECT * FROM sizes WHERE product_id = ?';
  const params = [];

  // Se è stato fornito un termine di ricerca, aggiunge una clausola WHERE per filtrare i prodotti
  if (searchTerm) {
    sql += ' WHERE name LIKE ? OR description LIKE ? OR description LIKE ?';
    params.push(`%${searchTerm}%`, `%${searchTerm.split(' ')[0]}%`, `%${searchTerm.split(' ')[1]}%`); // Usa il carattere jolly per la ricerca parziale
  }

  // Aggiungi l'ordinamento alla query
  if (sortBy && order) {
    sql += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
  }

  // Esegui la query
  connection.query(sql, params, (err, searchResults) => {
    if (err) {
      return res.status(500).json({ error: 'Errore lato server nella funzione search' });
    }

    if (searchResults.length === 0) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    // Aggiungi dettagli come immagini e taglie
    const productsWithDetails = [];
    let processedCount = 0;

    searchResults.forEach((product) => {
      connection.query(imagesSql, [product.id], (err, imagesResults) => {
        if (err) {
          return res.status(500).json({ error: 'Errore lato server nel recupero immagini' });
        }

        product.images = imagesResults.map((image, idx) => ({
          ...image,
          image_url: `${req.imagePath}${product.slug}-${idx + 1}.webp`,
        }));

        connection.query(sizesSql, [product.id], (err, sizesResults) => {
          if (err) {
            return res.status(500).json({ error: 'Errore lato server nel recupero taglie' });
          }

          product.sizes = sizesResults;
          productsWithDetails.push(product);
          processedCount++;

          // Quando tutti i prodotti sono elaborati, restituisci i risultati
          if (processedCount === searchResults.length) {
            res.json(productsWithDetails);
          }
        });
      });
    });
  });
}

export default search;