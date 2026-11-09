function List() {
	this.length = 0,
	this.add = function(value) {
		this[this.length] = value;
		this.length++;
		return true;
	},
	this.remove = function(index) {
		if (this.length === 0) {
			return false;
		}
		for (let i = index + 1; i <= this.length; i++) {
			this[i - 1] = this[i];
		}
		delete this[this.length - 1];
		this.length--;
		return true;
	}
}

function LinkedList() {
	this.increment = 0,
	this.head = null,
	this.tail = null,
	// Function previous() takes in a position and returns the position of the previous node
	this.previous = function(position) {
		let index = this.head;
		while (index !== null) {
			if (this[index].next === position) {
				return index;
			}
			index = this[index].next;
		}
		return false;
	}
	// Function search() takes in an entry and returns the position if it's already in the linked list
	this.search = function(value) {
		let index = this.head;
		while (index !== null) {
			if (this[index].date === value) {
				return index;
			}
			index = this[index].next;
		}
		return false;
	}
	// Function append() takes an entry and adds it to the tail of the linked list
	this.append = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return true;
		}
		this[this.increment] = value;
		this[this.tail].next = this.increment;
		this.tail = this.increment;
		this.increment++;
		return true;
	}
	// Function prepend() takes an entry and adds it before the head of the linked list
	this.prepend = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return true;
		}
		this[this.increment] = value;
		this[this.increment].next = this.head;
		this.head = this.increment;
		this.increment++;
		return true;
	}
	// Function insert() takes an entry and position and adds it after the node on position
	this.insert = function(value, position) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return true;
		}
		if (this.tail === position) {
			this.tail = this.increment;
		}
		this[this.increment] = value;
		this[this.increment].next = this[position].next;
		this[position].next = this.increment;
		this.increment++;
		return true;
	}
	// Function remove() takes a position and deletes its node
	this.remove = function(position) {
		if (this.head === null) {
			return false;
		}
		if (this.tail === position) {
			this.tail = this.previous(position);
		}
		if (this.head === position) {
			this.head = this[this.head].next;
		} else {	
			this[this.previous(position)].next = this[position].next;
			delete this[position];
		}
	}
	// Function place() takes an entry and adds it to the linked list to its appropriate position based on date
	// Todo: Fix conditions
	this.place = function(value) {
		if (this.search(value.date) !== false) {
			return false;
		}
		if (this.head === null) {
			this.head = this.increment;
			this.tail = this.increment;
			this[this.increment] = value;
			this.increment++;
			return true;
		}
		let valueDate = value.date;
		const valueDateArr = valueDate.split(".");
		if (this.head.next === undefined) {
			let headDate = this[this.head].date;
			const headDateArr = headDate.split(".");
			if (headDateArr[2] > valueDateArr[2] || (headDateArr[2] === valueDateArr[2] && headDateArr[1] > valueDateArr[1]) || (headDateArr[2] === valueDateArr[2] && headDateArr[1] === valueDateArr[1] && headDateArr[0] > valueDateArr[0])) {
				this.prepend(value);
			} else {
				this.append(value);
			}
			return true;
		}
		let index = this.head;
		let headNextDate = this[this[this.head].next].date;
		const headNextDateArr = headNextDate.split(".");
		if (headnextYear > valueDateArr[2] || (headnextYear === valueDateArr[2] && headnextMonth > valueDateArr[1]) || (headnextYear === valueDateArr[2] && headnextMonth === valueDateArr[1] && headnextDay > valueDateArr[0])) {
			this.prepend(value);
			return true;
		}
		while (this[index].next !== null) {
			let nextDate = this[this[index].next].date;
			const nextDateArr = [nextDay, nextMonth, nextYear]; 
			nextDateArr = nextDate.split(".");
			if (nextYear > valueDateArr[2] || (nextYear === valueDateArr[2] && nextMonth > valueDateArr[1]) || (nextYear === valueDateArr[2] && nextMonth === valueDateArr[1] && nextDay > valueDateArr[0])) {
				this.insert(value, index);
				return true;
			}
			index = this[index].next;
		}
		this.append(value);
		return true;
	}
	// Function print() logs the linked list and its contents in console
	this.print = function() {
		let index = this.head;
		let output = "";
		while (index !== null) {
			output += `[${index}] (${this[index].date}) \n`;
			index = this[index].next;
		}
		console.log(output);
		return true;
	}
}

function entry(title, content) {
	this.title = title;
	this.content = content;
}

function day(date) {
	this.date = date;
	this.next = null;
	this.entries = new List();
}

function newEntry() {
	
}

function navPrevious() {
	
}

function navNext() {
	
}

function navOldest() {
	console.log("Test");
}

function navLatest() {
	
}

function removeEntry() {
	
}

function saveDiary() {
	
}

function loadDiary() {
	
}

function unloadDiary() {
	
}

// This is where the valley of functions ends
let today = new Date().toLocaleDateString("cs-CZ", { day: 'numeric', year: 'numeric', month: 'numeric'  }).replace(/\s/g, "");
let currentDate = today;

// Testing area
const days = new LinkedList();

days.place(new day("01.11.2026"));
days[days.search("01.11.2026")].entries.add(new entry("Mei's day", "Lulu"));
days.place(new day("00.11.2026"));
days.place(new day("00.11.2025"));
days.place(new day("30.9.2026"));
days.place(new day("00.11.2026"));
days.place(new day("00.11.2026"));
days.place(new day("00.11.2026"));
days.place(new day("22.1.1995"));


// days.insert(new day("01.11.2026"), days.place(new day("01.11.2026")));
// days[days.search("01.11.2026")].entries.add(new entry("Mei's day", "Lulu"));
days.print();