from datetime import datetime, timedelta, date

class Student:
    def __init__(self, name: str, surname: str, date_of_birth: date) -> None:
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
    def convert(self) -> list:
        return [self.name, self.surname, self.date_of_birth]
        

def average_date(students: dict[str, Student]) -> date:
    res = datetime.fromtimestamp(sum(map(lambda x: datetime.combine(x.date_of_birth, datetime.min.time()).timestamp(), 
                                         students.values())) / len(students))
    if res.hour >= 12:
        return res.date() + timedelta(days=1)
    return res.date()
    
students = {
    '234564': Student('Alexander', 'Ivanov', date(2013, 2, 3)),
    '987654': Student('Olivia', 'Smith', date(2012, 5, 10)),
    '456789': Student('Emma', 'Johnson', date(2011, 8, 17)),
    '345678': Student('Liam', 'Williams', date(2010, 11, 24)),
    '876543': Student('Noah', 'Jones', date(2009, 4, 1)),
    '567890': Student('Sophia', 'Brown', date(2008, 7, 8)),
    '345678': Student('Ava', 'Davis', date(2007, 10, 15)),
    '456789': Student('Isabella', 'Miller', date(2006, 1, 22)),
    '789012': Student('Mia', 'Wilson', date(2005, 3, 30)),
    '234567': Student('Charlotte', 'Moore', date(2004, 6, 6)),
    '890123': Student('Amelia', 'Taylor', date(2003, 9, 13)),
    '678901': Student('Harper', 'Anderson', date(2002, 12, 20)),
    '789012': Student('Evelyn', 'Thomas', date(2001, 2, 27)),
    '123456': Student('Abigail', 'Roberts', date(2000, 5, 5)),
    '890123': Student('Emily', 'Clark', date(1999, 8, 12)),
    '567890': Student('Elizabeth', 'Walker', date(1998, 11, 19)),
    '234567': Student('Sofia', 'Hall', date(1997, 1, 26)),
    '345678': Student('Ella', 'Young', date(1996, 4, 3)),
    '456789': Student('Grace', 'King', date(1995, 7, 10)),
    '123456': Student('Victoria', 'Scott', date(1994, 10, 17))
}
