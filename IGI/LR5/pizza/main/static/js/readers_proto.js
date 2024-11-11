function PersonProto(lastName, firstName, middleName) {
    this.lastName = lastName.trim();
    this.firstName = firstName.trim();
    this.middleName = middleName.trim();

    if (this.lastName === '')
        throw 'The lastName can\'t be empty';
    if (this.firstName === '')
        throw 'The firstName can\'t be empty';
    if (this.middleName === '')
        throw 'The middleName can\'t be empty';
}

PersonProto.prototype.getFullName = function() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
};

Object.defineProperty(PersonProto.prototype, 'FirstName', {
    get: function() { return this.firstName; },
    set: function(value) {
        if (value.trim() === '')
            throw 'The firstName can\'t be empty';
        this.firstName = value.trim();
    }
});

Object.defineProperty(PersonProto.prototype, 'LastName', {
    get: function() { return this.lastName; },
    set: function(value) {
        if (value.trim() === '')
            throw 'The lastName can\'t be empty';
        this.lastName = value.trim();
    }
});

Object.defineProperty(PersonProto.prototype, 'MiddleName', {
    get: function() { return this.middleName; },
    set: function(value) {
        if (value.trim() === '')
            throw 'The middleName can\'t be empty';
        this.middleName = value.trim();
    }
});


function ReaderProto(lastName, firstName, middleName, joinYear, libraryCard) {
    PersonProto.call(this, lastName, firstName, middleName);
    
    this.joinYear = joinYear.trim();
    this.libraryCard = libraryCard.trim();

    if (this.joinYear === '')
        throw 'The joinYear can\'t be empty';
    if (this.libraryCard === '')
        throw 'The libraryCard can\'t be empty';
    if (isNaN(this.joinYear) || this.joinYear.includes('+') || 
        this.joinYear.includes('-') || this.joinYear.includes('e') || 
        this.joinYear > 2024 || this.joinYear < 2000)
        throw 'The join year should be between 2000 and 2024';
    if (isNaN(this.libraryCard) || this.libraryCard.includes('.') || 
        this.libraryCard.includes('+') || this.libraryCard.includes('-') ||
        this.libraryCard.includes('e') || this.libraryCard.length !== 4)
        throw 'The library card should have 4 numbers';
}

ReaderProto.prototype = Object.create(PersonProto.prototype);
ReaderProto.prototype.constructor = ReaderProto;

ReaderProto.readers = [];

ReaderProto.add = function(lastName, firstName, middleName, joinYear, libraryCard) {
    try {
        let container = document.querySelector('.container_proto');
        let reader = new ReaderProto(lastName, firstName, middleName, joinYear, libraryCard);
        container.innerHTML += `<div>${reader.getFullName()}</div>`;
        this.readers.push(reader);
        this.findOldest();
    } catch (e) {
        alert(e);
    }
};

ReaderProto.prototype.getFullName = function() {
    return `${PersonProto.prototype.getFullName.call(this)}, join year: ${this.joinYear}, library card: ${this.libraryCard}`;
};

ReaderProto.findOldest = function() {
    let oldest = document.getElementById('oldest_proto');
    if (this.readers.length > 0) {
        oldest.innerText = [...this.readers].sort((a, b) => a.joinYear - b.joinYear)[0].getFullName();
    } else {
        oldest.innerText = 'No readers available';
    }
};

function proto_add(lastName, firstName, middleName, joinYear, libraryCard){
    ReaderProto.add(lastName, firstName, middleName, joinYear, libraryCard);
}