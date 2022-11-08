const fs = require("fs")
let products = []
let categories = []

exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/products.json", 'UTF-8', (err, data) => {
            if (err) {
                reject(err)
                return

            }
            try {
                products = JSON.parse(data)
            }
            catch (err) {
                console.log(err)
            }
        })

        fs.readFile("./data/categories.json", 'UTF-8', (err, data) => {
            if (err) {
                reject(err)
                return
            }

            try {
                categories = JSON.parse(data)
            }
            
            catch (err) {
                console.log(err)
            }
        })

        resolve()
    })
}

exports.getAllProducts = () => {
    return new Promise(function (resolve, reject) {
        if (products.length == 0) {
            reject("No results returned")
            return
        }
     resolve(products)
    })
}

exports.getPublishedProducts = () => {
    return new Promise(function (resolve, reject) {
        let published = products.filter(function (products) { return products.published == true })
        if (published.length == 0) {
            reject("No results returned")
            return
        }
        resolve(published)
    })
}

exports.addProduct = (Data) => {
    return new Promise(function (resolve, reject) {
        Data.published = (Data.published) ? true : false;
        Data.postDate = new Date().toISOString().split("T")[0]
        Data.id = products.length + 1;
        products.push(Data);

        resolve();
    })
}

exports.getProductsByMinDate = function (minDateStrng) {
    return new Promise(function (resolve, reject) {
        var productsByMinDate = [];

        for (let i = 0; i < products.length; i++) {
            if (new Date(products[i].productDate) >= new Date(minDateStrng)) {
                productsByMinDate.push(products[i]);
            }
        }

        if (productsByMinDate.length == 0) {
            reject("No result returned");
            return;
        }

        resolve(productsByMinDate);
    });

}

exports.getProductById = function (id) {
    return new Promise(function (resolve, reject) {
        var productById = [];

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                productById.push(products[i]);
            }
        }

        if (productById.length == 0) {
            reject("No result returned");
            return;
        }

        resolve(productById);
    });
}

exports.getProductsByCategory = function (category) {
    return new Promise(function (resolve, reject) {
        var productsByCategory = [];

        for (let i = 0; i < products.length; i++) {

            if (products[i].category == category) {
                productsByCategory.push(products[i]);
            }
        }

        if (productsByCategory.length == 0) {
            reject("No result returned");
            return;
        }

        resolve(productsByCategory);
    });

}

exports.getPublishedProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        
      let output = products.filter(
        (product) => product.published == true && product.category == category
      )
      
      if (!output.length) {
        reject("No results returned")
        return;
      }
      
      else {
        console.log(output)
        resolve(output);
      }
    })
}

exports.getCategories = () => {
    return new Promise(function (resolve, reject) {
        if (categories.length == 0) {
            reject("No results returned")
            return
        }

        resolve(categories)
    })
}