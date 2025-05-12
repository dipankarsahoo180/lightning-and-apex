import { LightningElement, track, api } from 'lwc';

export default class MonthYearPicker extends LightningElement {
    showPicker;
    currentMonth;
    currentYear = new Date().getFullYear();
    @api currentDate ;//= new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    @api selectedDate ;//= new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    @api disabled = false;
    
    months = [
        { label: 'Jan', value: 0 },
        { label: 'Feb', value: 1 },
        { label: 'Mar', value: 2 },
        { label: 'Apr', value: 3 },
        { label: 'May', value: 4 },
        { label: 'Jun', value: 5 },
        { label: 'Jul', value: 6 },
        { label: 'Aug', value: 7 },
        { label: 'Sep', value: 8 },
        { label: 'Oct', value: 9 },
        { label: 'Nov', value: 10 },
        { label: 'Dec', value: 11 },
    ];

    minYear = new Date().getFullYear() - 3;
    maxYear = new Date().getFullYear();

    // This is where the outside-click logic goes
    // connectedCallback() {
    //     window.addEventListener('click', this.handleWindowClick, true);
    // }

    // disconnectedCallback() {
    //     window.removeEventListener('click', this.handleWindowClick, true);
    // }

    // handleWindowClick = (event) => {
    //     this.showPicker = false;
    // };

    handleDisplayPicker(){
        this.showPicker = true;
    }

    handleRemovePicker(){
        this.showPicker = false;
    }
    
    togglePicker() {
        if(this.disabled) {
            this.showPicker = false;
            return;
        }
        this.showPicker = !this.showPicker;
    }

    prevYear() {
        if (this.currentYear > this.minYear) {
            this.currentYear--;
        }
        this.showPicker = true;
    }

    nextYear() {
        if (this.currentYear < this.maxYear) {
            this.currentYear++;
        }
        this.showPicker = true;
    }

    handleMonthClick(event) {
        this.currentMonth = parseInt(event.currentTarget.dataset.value, 10);
        this.currentDate = new Date(this.currentYear, this.currentMonth, 1);
        this.selectedDate = this.currentDate.toLocaleDateString('en-CA');

        this.showPicker = false;
        this.dispatchEvent(new CustomEvent('datechange', {
            detail: this.selectedDate
        }));
    }

    get formattedDate (){
        return this.currentDate?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) || '';
    }

    get isPrevDisabled() {
        this.showPicker = true;
        return this.currentYear <= this.minYear;
    }
    
    get isNextDisabled() {
        this.showPicker = true;
        return this.currentYear >= this.maxYear;
    }

    get prevButtonClass() {
        return this.isPrevDisabled ? 'nav-btn disabled' : 'nav-btn';
    }
    
    get nextButtonClass() {
        return this.isNextDisabled ? 'nav-btn disabled' : 'nav-btn';
    }
}