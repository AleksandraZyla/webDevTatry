/*!
* Start Bootstrap - Grayscale v7.0.5 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

//obsluga slidera 
function slideSwitch() {
    var $active = $('#slideshow IMG.active');
    if ($active.length === 0)
        $active = $('#slideshow IMG:last');
    var $next = $active.next().length ? $active.next()
        : $('#slideshow IMG:first');
    $active.addClass('last-active');
    $next.css({ opacity: 0.0 })
        .addClass('active')
        .animate({ opacity: 1.0 }, 1000, function () {
            $active.removeClass('active last-active');
        });
}
$(function () {
    setInterval("slideSwitch()", 3000);
});

//funkcje walidacyjne dla formularza 
function sprawdz_pole(id_pole, obiektRegex) {
    var obiektPole = document.getElementById(id_pole);
    if (!obiektRegex.test(obiektPole.value))
        return (false);
    else return (true);
}

function sprawdz_box(nazwa_box) {
    var ok = false;
    var obiekt = document.getElementsByName(nazwa_box);
    for (let i = 0; i < obiekt.length; i++) {
        if (obiekt[i].checked) {
            ok = true;
        }
    }
    if (ok) return (true);
    else return (false);
}

function sprawdz_radio(nazwa_radio) {
    var obiekt = document.getElementsByName(nazwa_radio);
    for (i = 0; i < obiekt.length; i++) {
        aktualne = obiekt[i].checked;
        if (aktualne) return true;
    }
    return false;

}
function sprawdz_date(id_data) {
    var obiekt = document.getElementById(id_data);
    var CurrentDate = new Date();
    var today = CurrentDate.toISOString().split('T')[0];
    console.log(today);
    console.log(obiekt.value);
    if (obiekt.value && obiekt.value > today) return (true);
    else return (false);
}

function sprawdz() {
    var ok = true;
    obiektNazw = /^([a-ząćęółśźżA-ZŻŹŁ]{2,}\s[a-ząćęółśźżA-ZŻŹŁ]{1,}'?-?[a-ząćęółśźżA-ZŻŹŁ]{2,}\s?([a-ząćęółśźżA-ZŻŹŁ]{1,})?)/;
    obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;

    if (!sprawdz_pole("imie_nazwisko", obiektNazw)) {
        ok = false;
        document.getElementById("nazwa_error").innerHTML =
            "Wpisz poprawnie imię i nazwisko!";
    }

    else document.getElementById("nazwa_error").innerHTML = "";

    if (!sprawdz_pole("email", obiektemail)) {
        ok = false;
        document.getElementById("email_error").innerHTML =
            "Wpisz poprawnie adres email!";
    }

    else document.getElementById("email_error").innerHTML = "";

    if (!sprawdz_date("data")) {
        ok = false;
        document.getElementById("datap_error").innerHTML =
            "Wpisz poprawnie datę początkową!";
    }

    else document.getElementById("datap_error").innerHTML = "";

    if (!sprawdz_box("trasa")) {
        ok = false;
        document.getElementById("box_error").innerHTML = "Wybierz trasę!";
    }

    else document.getElementById("box_error").innerHTML = "";

    if (!sprawdz_radio("liczba_dni")) {
        ok = false;
        document.getElementById("radio_error").innerHTML = "Wybierz ilość dni!";
    }
    else document.getElementById("radio_error").innerHTML = "";

    return ok;
}

function usun(i) {
    localStorage.removeItem(localStorage.key(i))
}

function edytuj(i) {
    var retrieve = JSON.parse(localStorage.getItem(localStorage.key(i)));
    document.getElementById("wartosc" + i).innerHTML = "<form><input class='form-control' id='nowa_data' type='date' value='" + retrieve.data + "'> Nowa data początkowa </form>";
    document.getElementById("przycisk" + i).innerHTML = "<button class='btn btn-primary col-auto' id='saveButton'onclick='zapisz(" + i + ")'>Zapisz</button>";
}

function zapisz(i) {
    var u1 = JSON.parse(localStorage.getItem(localStorage.key(i)));
    u1.data = document.getElementById("nowa_data").value;
    localStorage.setItem(u1.nazwa, JSON.stringify(u1));

}

//obsluga local storage
class User {
    constructor(nazwa = "user", email = "undef", osoby = "x", dni = "undef", data = "undef", trasa = "") {
        this.nazwa = nazwa;
        this.email = email;
        this.osoby = osoby;
        this.dni = dni;
        this.data = data;
        this.trasa = trasa;
    }
    pokaz() {

        var dane = "<table class='table-responsive' style='width:100%'><th>Osoba</th><th>Szczegóły</th><th>Usuń</th>";
        for (var i = 0; i < localStorage.length; i++) {
            var retrieveItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            dane += "<tr><td id ='nazwa'>" + localStorage.key(i) + "</td><td id='wartosc" + i + "'>" + retrieveItem.data + " " + retrieveItem.trasa + "</td><td><button class='btn btn-primary col-auto' id='deleteButton'onclick='usun(" + i + ")'>Usuń</button></td><td id='przycisk" + i + "'><button class='btn btn-primary col-auto' id='editButton'onclick='edytuj(" + i + ")'>Edytuj datę</button></td></tr>";
        }
        dane += "</table>"
        document.getElementById("aktualne_rezerwacje").innerHTML = "<h2 class='text-white mb-5 animate__animated animate__fadeInUp'>Aktualne rezerwacje:</h2>";
        document.getElementById("dane").innerHTML = dane;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    var user = new User();
    // obsługa akcji kliknięcia na przycisk z id=’rezerwuj’
    submitButton.addEventListener("click", () => {

        user.nazwa = document.getElementById("imie_nazwisko").value;
        user.dni = document.getElementsByName("liczba_dni").value;
        user.email = document.getElementById("email").value;
        user.osoby = document.getElementById("liczba_osob").value;
        user.data = document.getElementById("data").value;
        var pomocnicza = document.getElementsByName("trasa");
        for (let i = 0; i < pomocnicza.length; i++) {
            if (pomocnicza[i].checked) {
                user.trasa += pomocnicza[i].value + " ";
            }
        }
        //zapisz obiekt user do localStorage...
        console.log(sprawdz());
        if (sprawdz() == true && localStorage.getItem(user.email) == null) {
            var klucz = user.nazwa;
            var wartosc = JSON.stringify(user);
            localStorage.setItem(klucz, wartosc); //wartosc- caly obiekt
        } 
    });

    showButton.addEventListener("click", () => {
        if (localStorage.length != 0) {
            user.pokaz();
        } else {
            document.getElementById("aktualne_rezerwacje").innerHTML = "<h2 class='text-white mb-5 animate__animated animate__fadeInUp'>Brak rezerwacji</h2>";
            document.getElementById("dane").innerHTML = "";
        }
    })

});

//fetch
document.addEventListener("DOMContentLoaded", function () {
    var but1 = document.getElementById("fetchButton");
    but1.addEventListener('click', function () {
        fetch("http://localhost/testajax/dane/ciekawostki.txt")
            .then(response => { return response.text(); })
            .then(dane => {
                let ciekawostki = dane.split(";");
                var randomizer = Math.floor(Math.random() * ciekawostki.length);
                document.getElementById("ciekawostki").innerHTML = ciekawostki[randomizer];
            })
    },
        false);
})


//menu
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});