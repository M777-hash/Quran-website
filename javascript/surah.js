const urlParams = new URLSearchParams(window.location.search);
const surahId = urlParams.get("id"); // string، لأن JSON keys أرقام على شكل string

// أسماء السور
const surahNames = [
    "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام",
    "الأعراف","الأنفال","التوبة","يونس","هود","يوسف",
    "الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف",
    "مريم","طه","الأنبياء","الحج","المؤمنون","النور",
    "الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
    "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات",
    "ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان",
    "الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
    "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة",
    "الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة",
    "المنافقون","التغابن","الطلاق","التحريم","الملك","القلم",
    "الحاقة","المعارج","نوح","الجن","المزمل","المدثر",
    "القيامة","الإنسان","المرسلات","النبإ","النازعات","عبس",
    "التكوير","الانفطار","المطففين","الانشقاق","البروج",
    "الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس",
    "الليل","الضحى","الشرح","التين","العلق","القدر","البينة",
    "الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة",
    "الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
    "المسد","الإخلاص","الفلق","الناس"
];

fetch("javascript/quran.json")
    .then(response => response.json())
    .then(data => {
        const verses = data[surahId];

        if (!verses) {
            document.getElementById("sura-name").textContent = "السورة غير موجودة";
            return;
        }

        // اسم السورة
        document.getElementById("sura-name").textContent = "سورة " + surahNames[surahId - 1];

        const versesContainer = document.getElementById("verses");
        versesContainer.innerHTML = "";

       

// إضافة البسملة في المنتصف لكل السور عدا سورة التوبة
if (surahId != "1" && surahId != "9") { 
    const basmala = document.createElement("div");
    basmala.className = "basmala";
    basmala.textContent = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ";
    versesContainer.appendChild(basmala);
}




        verses.forEach(v => {
           // نص الآية
const textSpan = document.createElement("span");
textSpan.textContent = v.text;

// رقم الآية
const numberSpan = document.createElement("span");
numberSpan.className = "verse-number";
numberSpan.textContent = `﴿${v.verse}﴾`;

// حاوية الآية
const ayahContainer = document.createElement("span");
ayahContainer.className = "ayah";
ayahContainer.appendChild(textSpan);
ayahContainer.appendChild(numberSpan);

// أضفها للصفحة
versesContainer.appendChild(ayahContainer);

        });
    })
    .catch(err => console.log("خطأ في تحميل السورة:", err));
