const birth_date = document.getElementById('birth_date');
birth_date.value = new Date().toISOString().split('T')[0]; 
birth_date.max = new Date().toISOString().split('T')[0];

function checkAge(){
    let response = "";
    const current_date = new Date();
    const input_date = new Date(birth_date.value)
    let age = current_date.getFullYear() - input_date.getFullYear();
    const monthDifference = current_date.getMonth() - input_date.getMonth();     
    if (monthDifference < 0 || (monthDifference === 0 && current_date.getDate() < input_date.getDate())) {
        age--;
    }
    if (age >= 18) {
        switch (new Date(birth_date.value).getDay()) {
            case 1:
                alert("Это понедельник");
                break;
            case 2:
                alert("Это вторник");
                break;
            case 3:
                alert("Это среда");
                break;
            case 4:
                alert("Это четврег");
                break;
            case 5:
                alert("Это пятница");
                break;
            case 6:
                alert("Это суббота");
                break;
            case 0:
                alert("Это воскресенье");
                break;
            default:
                alert("Произошла ошибка определения дня недели");
                break;
        }
    }
    else {
        alert("Для несовершеннолетних пользователей требуется разрешение родителей")
    }
    
}