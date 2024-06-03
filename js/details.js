import { calculatePrice, elements } from "./helpers.js";
import { menu } from "./db.js";

console.log(window.location)
//Url deki parametreleri yönetebilmek için URLSearchParams olusturduk
//ornegi olustururken kendi url imizdeki parametreleri gönderdik
const searchParams=new URLSearchParams(window.location.search)
// get metodu ile url deki parametresine eriştik
const paramId=searchParams.get("id")
//menu içerisinden id'sini bildiğimiz elemana ulaşma
const product=menu.find((item)=>item.id===Number(paramId))
console.log(product)
// buldugumuz ürüne göre arayüzü ekrana basma
elements.outlet.innerHTML=`
        <div class="d-flex justify-content-between align-items-center">
            <a href="/"><i class="bi bi-house fs-1"></i></a>
            <div>anasayfa/ ${product.category}/ ${product.title.toLowerCase()}</div>
        </div>
        <h1 class="text-center my-3 shadow p-2 rounded">${product.title}</h1>
        <div class="d-flex align-items-center justify-content-center">
            <img src="${product.img}" style="max-width: 500px;" class="img-fluid shadow rounded" alt="">
        </div>
        <div>
            <h3 class="my-5">Ürün Kategorisi: <span class="text-success">${product.category}</span></h3>
            <h3 class="my-5">Ürün Fiyatı: <span class="text-success">${calculatePrice(product.price)} TL</span></h3>
        </div>
        <p class="lead fs-3">${product.desc}</p>
`
