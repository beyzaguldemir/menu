import { buttonsData, menu } from "./js/db.js";
import { calculatePrice, elements } from "./js/helpers.js";
// ! Fonksiyonlar
const renderMenuItems=(menuItems)=>{
    /*Dizideki her bir objeyi html elemanına dönüştürür ve diziye aktarır*/
    let menuHTML=menuItems.map((item)=>
    `<a href="/productDetail.html?id=${item.id}&title=${item.title}" class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2" id="card">
        <img src="${item.img}" class="rounded shadow" alt="">
        <div>
            <div class="d-flex justify-content-between">
                <h5>${item.title}</h5>
                <p class="text-success">${calculatePrice(item.price)} TL</p>
            </div>
            <p class="lead">${item.desc}</p>
        </div>
    </a>`
    );
    menuHTML=menuHTML.join("")
    elements.menuArea.innerHTML=menuHTML

}
//*tıklanılan butonun kategorisine göre ürün listeleme
const searchCategory=(e)=>{
    const category=e.target.dataset.category
    //*butonun kategorisi ve menunun içindeki urunlerin kategorileriyle eslesen urunleri getirir
    const filtredMenu=menu.filter((item)=>item.category===category)
    
    if(category=="undefined"){
        return;
        
    }
    //* hepsi seçilirse bütün menuyu ekrana yazdırır
    else if(category=="all"){
        renderMenuItems(menu)

    }
    //*filtrelenen menuyu ekrana aktarır
    else{
        renderMenuItems(filtredMenu)
    }
    //*seçtiğimiz kategorinin butonu aktifleştirmek için category i gönderdik
    renderButtons(category)
}
//Ekrana butonları basma
const renderButtons=(active)=>{
    console.log(active)
    //*Eski butonları ekrandan sil
    elements.buttonsArea.innerHTML=""
    //Yeni butonlar oluşturma
    buttonsData.forEach((btn)=>{
        console.log(btn)
        //HTML butonu oluşturma
        const buttonElement=document.createElement("button")
        //Butonlara class larını ekleme
        buttonElement.className="btn btn-outline-dark filter-btn"
        //İçerisindeki yazıyı değistirme
        buttonElement.textContent=btn.text
        //Hangi kategori oldugu buton kategorisine ekleme
        buttonElement.dataset.category=btn.value
        //eger ki kategoriyle buton kategorisi eslesirse ona farklı class ekle
        if(btn.value===active){
            buttonElement.classList.add("bg-dark","text-light")
        }
        //HTML e gönderme
        elements.buttonsArea.appendChild(buttonElement)
    })
    
}


//! Olay izleyicileri
// document.addEventListener("DOMContentLoaded", renderMenuItems(menu))
// * sayfa yüklendiğinde renderButtons ve renderMenuItems fonksiyonlarını çalıştır
document.addEventListener("DOMContentLoaded",()=>{
    renderButtons("all"),
    renderMenuItems(menu)
})
elements.buttonsArea.addEventListener("click",searchCategory)

