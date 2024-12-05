export function funcionPattern(data) {
  
    let items = "";

    if (!data) {
        console.log("error no hay datos a leer");
        return;
    }


    for (const item of data) {
       /* console.log("la descripcion"+item.description.slice(0,5)) */
        let pattern = `
            <div id="prodcards" class="producto-card">
               <div class="bonif">20% OFF</div>
                <img src="${item.image}" alt="Producto ${item.id}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p> precio: $ ${item.precio}</p>
               
                <div>
                     <!-- Botón para Detalle -->
                    <button class="w-100 btn btn-primary" onclick="window.location.href='detalle.html?id=${item.id}&title=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&description=${encodeURIComponent(item.description)}&color=${encodeURIComponent(item.color)}&precio=${item.precio}&stock=${item.stock}'">Detalle</button>
                </div>
                </div>
            </div>

          `;
        items += pattern;
    }
    /*console.log(items)*/
    return items;
}