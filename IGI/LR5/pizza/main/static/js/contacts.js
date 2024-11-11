document.getElementById('addButton').addEventListener('click', function(){
    let display = document.getElementById('contactForm').style.display;
    if (display == 'none')
        document.getElementById('contactForm').style.display = 'flex';
    else
        document.getElementById('contactForm').style.display = 'none';
});

document.getElementById('filterButton').addEventListener('click', function(){
    let display = document.getElementById('filterForm').style.display;
    if (display == 'none')
        document.getElementById('filterForm').style.display = 'flex';
    else
        document.getElementById('filterForm').style.display = 'none';
});

document.getElementById('award').addEventListener('click', function(){
    let message = document.getElementById('message');
    message.innerHTML = '';
    for (let data of document.querySelectorAll('tbody [type=checkbox]')){
        if (data.checked){
            message.innerHTML += `<div>${data.value}</div>`;
        }
    }
});




function choose_column(parameter){
    let th = document.getElementById(parameter);
    if (last_sort_parameter == undefined) {
        th.innerText += '\u25BC';
        count = 1;
        last_sort_parameter = parameter;
        sort(parameter, true);
    }
    else if (last_sort_parameter != parameter){
        let old_th = document.getElementById(last_sort_parameter);
        old_th.innerHTML = old_th.innerHTML.replace('\u25BC', '').replace('\u25B2', '');
        th.innerText += '\u25BC';
        count = 1;
        last_sort_parameter = parameter;
        sort(parameter, true);
    }
    else if (last_sort_parameter == parameter) {
        if (count == 1){
            th.innerHTML =  th.innerHTML.replace('\u25BC', '\u25B2');
            count = 2;
            last_sort_parameter = parameter;
            sort(parameter, false);
        }
        else if (count == 2){
            th.innerHTML = th.innerHTML.replace('\u25B2', '');
            count = 0;
            last_sort_parameter = undefined;
            sort('order', true);
        }
    }
}

function sort(parameter, asc){
    let contacts = [];
    let tbody = document.querySelector('tbody');
    for (let th of tbody.querySelectorAll('tr')){
        contacts.push({
            lastname: th.querySelector("[itemprop=lastname]").innerText,
            firstname: th.querySelector("[itemprop=firstname]").innerText,
            job_title: th.querySelector("[itemprop=job_title]").innerText,
            phone_number: th.querySelector("[href^=tel]").innerText,
            email: th.querySelector("[href^=mailto]").innerText,
            image: th.querySelector(".contanct_image").src,
            order: th.querySelector("[itemprop=order]").innerText 
        });
    }
    contacts.sort(function(a, b){
        if (parameter === 'order' ) return (asc ? a.order - b.order : b.order - a.order);
        else return (asc ? a[parameter].localeCompare(b[parameter]) : b[parameter].localeCompare(a[parameter]));
    });
    tbody.innerHTML = '';
    document.getElementById('choice').checked = false;
    for (let elem of contacts){
        tbody.innerHTML += 
        `
        <tr>
            <td itemprop="order">${elem.order}</td>
            <td><img class="contanct_image" src="${elem.image}" height="250" width="300"></td>
            <td itemprop="lastname">${elem.lastname}</td>
            <td itemprop="firstname">${elem.firstname}</td>
            <td><span itemprop="job_title">${elem.job_title}</span></td>
            <td itemprop="phone_number">
                <a href="tel:${elem.lastname}">${elem.phone_number}</a>
            </td>
            <td itemprop="email">
                <a href="mailto:${elem.email}">${elem.email}</a>
            </td>
            <td>
                <input type="checkbox" value="${elem.lastname} ${elem.firstname}" onchange="{
                    document.getElementById('choice').checked = 
                        Array.from(document.querySelectorAll('tbody [type=checkbox]')).every(e => e.checked)
                }">
            </td>
        </tr> 
        `
    }
}

function add(){
    const new_contact = {
        lastname: document.querySelector("#new_lastname").value,
        firstname: document.querySelector("#new_firstname").value,
        job_title: document.querySelector("#new_job_title").value,
        phone_number: document.querySelector("#new_phone_number").value,
        email: document.querySelector("#new_email").value,
        image: 'http://127.0.0.1:8000/media/contact_images/blank_contact.png',
        order: default_contacts.length + 1
    }
    for (let p in new_contact)
    {
        if (p == 'order')
            continue;
        if (new_contact[p].trim() === ''){
            alert('Поля не должны быть пустыми');
            return;
        }
        if (new_contact[p].trim().length < 3){
            alert('Фамилия, имя и должность должны состоять хотя бы из 2 букв');
            return;
        }
    };
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(new_contact.email)){
        alert('Введите корректную почту');
        return;
    }
    while(new_contact.phone_number.includes(' ')){
        new_contact.phone_number = new_contact.phone_number.replace(' ', '');
    }
    if (!/^(80|\+375)\({0,1}(33|44|25|29)\){0,1}\d{3}-{0,1}\d{2}-{0,1}\d{2}$/.test(new_contact.phone_number))
    {
        alert('Введите корректный номер телефона');
        return;
    }

    new_contact.lastname = new_contact.lastname[0].toUpperCase() + new_contact.lastname.slice(1);
    new_contact.firstname = new_contact.firstname[0].toUpperCase() + new_contact.firstname.slice(1);
    sort('order', true);
    count = 0;
    let th = document.getElementById(last_sort_parameter);
    if (th != undefined){
        th.innerHTML = th.innerHTML.replace('\u25BC', '').replace('\u25B2', '');
        last_sort_parameter = undefined;
    }
    default_contacts.push(new_contact);
    document.getElementsByTagName('tbody')[0].innerHTML += 
    `
    <tr>
        <td itemprop="order">${new_contact.order}</td>
        <td><img class="contanct_image" src="${new_contact.image}" height="250" width="300"></td>
        <td itemprop="lastname">${new_contact.lastname}</td>
        <td itemprop="firstname">${new_contact.firstname}</td>
        <td><span itemprop="job_title">${new_contact.job_title}</span></td>
        <td itemprop="phone_number">
            <a href="tel:${new_contact.lastname}">${new_contact.phone_number}</a>
        </td>
        <td itemprop="email">
            <a href="mailto:${new_contact.email}">${new_contact.email}</a>
        </td>
        <td>
            <input type="checkbox" value="${new_contact.lastname} ${new_contact.firstname}" onchange="{
                document.getElementById('choice').checked = 
                    Array.from(document.querySelectorAll('tbody [type=checkbox]')).every(e => e.checked)
            }">
        </td>
    </tr> 
    `
    alert(`Сотрудник ${new_contact.lastname} добавлен`);
}

function filter(){
    let contacts = [];
    let tbody = document.querySelector('tbody');
    let params = {
        lastname: document.getElementById('filter_lastname').value,
        firstname: document.getElementById('filter_firstname').value,
        job_title: document.getElementById('filter_job_title').value,
        phone_number: document.getElementById('filter_phone_number').value,
        email: document.getElementById('filter_email').value,
    };
    for (let contact of default_contacts){
        if (contact.lastname.includes(params.lastname) && 
        contact.firstname.includes(params.firstname) &&
        contact.job_title.includes(params.job_title) &&
        contact.phone_number.includes(params.phone_number) &&
        contact.email.includes(params.email)){
                contacts.push(contact);
            }
    };

    tbody.innerHTML = '';
    document.getElementById('choice').checked = false;
    for (let elem of contacts){
        document.getElementsByTagName('tbody')[0].innerHTML += 
        `
        <tr>
        <td itemprop="order">${elem.order}</td>
        <td><img class="contanct_image" src="${elem.image}" height="250" width="300"></td>
        <td itemprop="lastname">${elem.lastname}</td>
        <td itemprop="firstname">${elem.firstname}</td>
        <td><span itemprop="job_title">${elem.job_title}</span></td>
        <td itemprop="phone_number">
        <a href="tel:${elem.lastname}">${elem.phone_number}</a>
        </td>
        <td itemprop="email">
        <a href="mailto:${elem.email}">${elem.email}</a>
        </td>
        <td>
        <input type="checkbox" value="${elem.lastname} ${elem.firstname}" onchange="{
            document.getElementById('choice').checked = 
            Array.from(document.querySelectorAll('tbody [type=checkbox]')).every(e => e.checked)
        }">
        </td>
        </tr> 
        `
    }
}
function cancelFilter(){
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let elem of default_contacts){
        tbody.innerHTML += 
        `
        <tr>
            <td itemprop="order">${elem.order}</td>
            <td><img class="contanct_image" src="${elem.image}" height="250" width="300"></td>
            <td itemprop="lastname">${elem.lastname}</td>
            <td itemprop="firstname">${elem.firstname}</td>
            <td><span itemprop="job_title">${elem.job_title}</span></td>
            <td itemprop="phone_number">
                <a href="tel:${elem.lastname}">${elem.phone_number}</a>
            </td>
            <td itemprop="email">
                <a href="mailto:${elem.email}">${elem.email}</a>
            </td>
            <td>
                <input type="checkbox" value="${elem.lastname} ${elem.firstname}" onchange="{
                    document.getElementById('choice').checked = 
                        Array.from(document.querySelectorAll('tbody [type=checkbox]')).every(e => e.checked)
                }">
            </td>
        </tr> 
        `
    }
}

const default_contacts = [];
let tbody = document.querySelector('tbody');
for (let th of tbody.querySelectorAll('tr')){
    default_contacts.push({
        lastname: th.querySelector("[itemprop=lastname]").innerText,
        firstname: th.querySelector("[itemprop=firstname]").innerText,
        job_title: th.querySelector("[itemprop=job_title]").innerText,
        phone_number: th.querySelector("[href^=tel]").innerText,
        email: th.querySelector("[href^=mailto]").innerText,
        image: th.querySelector(".contanct_image").src,
        order: th.querySelector("[itemprop=order]").innerText 
    });
}

let last_sort_parameter;
let count = 0;
