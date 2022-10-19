import { Injectable } from '@angular/core';
import {
    faCheckSquare, faTrashAlt, faArrowAltCircleLeft,
    faArrowAltCircleRight, faPlusSquare, faSmile,
    faCalendarCheck,
    faWindowClose, faQuestionCircle, faClock, faCalendarTimes, faFrown, faCreditCard
} from '@fortawesome/free-regular-svg-icons';
import {
    faGraduationCap, faFrog, faChalkboardTeacher,
    faGlassCheers, faCircle, faArrowDown, faArrowUp, faEllipsisH,
    faTasks, faPencilAlt, faBug, faSearchDollar, faVial, faExpandArrowsAlt,
    faBrain, faInfoCircle, faClipboardList, faChartPie,faSackDollar, faScaleBalanced, faScrewdriverWrench, faTicket, faMagnifyingGlassDollar, faCode, faCog, faBullhorn, faUniversity, faExclamationTriangle, faHandHoldingDollar, faPeopleRobbery, faPiggyBank, faSackXmark,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root'
})
export class IconService {    
    interest = faSackXmark;
    principalAndInterest = faMagnifyingGlassDollar;
    minimumPaymentInterest = faPeopleRobbery;
    minPayPlusExtraInterest = faPiggyBank;
    creditCardMinPayInterest = faCreditCard;
    creditCard = faCreditCard;
    fixedPayment = faPiggyBank;
    creditCardDevil = faFrown;
    time = faClock;
    questionMark = faQuestionCircle;
    unhappy = faFrown;
    trap = faExclamationTriangle;
    interestSaved = faSackDollar;
    financialEmancipation = faUniversity;
    motivation = faBullhorn;
    taskBasedGoals = faCog;
    technology = faCode;
    useWhatYouGot = faScrewdriverWrench;
    breakEvenUnits = faScaleBalanced;
    grossProfitPercent =faSackDollar;
    sackDollar = faSackDollar;
    priority = faCircle;
    learnIcon = faGraduationCap;
    planning = faBrain;
    wartsAndAllIcon = faFrog;
    twentyMinuteRule  = faClock;
    doesItHaveValue = faMagnifyingGlassDollar;
    experimentLearnIcon = faChalkboardTeacher;
    goalsTaskIcon = faCheckSquare;
    celebrate = faGlassCheers;
    edit = faPencilAlt;
    delete = faTrashAlt;
    completed = faSmile;
    arrowLeft = faArrowAltCircleLeft;
    arrowRight = faArrowAltCircleRight;
    arrowUp = faArrowUp;
    arrowDown = faArrowDown;
    ellipisHorz = faEllipsisH;
    tasks = faTasks;
    addTask = faPlusSquare;
    defect = faBug;
    feature = faCalendarCheck;
    techDebt = faSearchDollar;
    test = faVial;
    moveTaskToGoal = faExpandArrowsAlt;
    information = faInfoCircle;
    tooltipHelp = faQuestionCircle;
    noTaskBackground = faClipboardList;
    completeGoal = faWindowClose;
    noPieChartData = faChartPie; 
}