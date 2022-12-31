import { Injectable } from '@angular/core';
import {
    faCheckSquare, faTrashAlt, faArrowAltCircleLeft,
    faArrowAltCircleRight, faPlusSquare, faSmile,
    faCalendarCheck,
    faWindowClose, faQuestionCircle, faClock, faCalendarTimes, faFrown, faCreditCard, faFaceSmile, faFaceMeh, faHourglassHalf
} from '@fortawesome/free-regular-svg-icons';
import {
    faGraduationCap, faFrog, faChalkboardTeacher,
    faGlassCheers, faCircle, faArrowDown, faArrowUp, faEllipsisH,
    faTasks, faPencilAlt, faBug, faSearchDollar, faVial, faExpandArrowsAlt,
    faBrain, faInfoCircle, faClipboardList, faChartPie, faSackDollar, faScaleBalanced, faScrewdriverWrench, faTicket, faMagnifyingGlassDollar, faCode, faCog, faBullhorn, faUniversity, faExclamationTriangle, faHandHoldingDollar, faPeopleRobbery, faPiggyBank, faSackXmark, faPersonChalkboard, faBed, faBedPulse, faPercent, faCalculator, faCommentDollar,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    static personChalkBoard = faPersonChalkboard;
    static creditCardInstruction1 = faCreditCard;
    interest = faSackXmark;
    principalAndInterest = faMagnifyingGlassDollar;
    minimumPaymentInterest = faPeopleRobbery;
    minPayPlusExtraInterest = faPiggyBank;
    creditCardMinPayInterest = faCreditCard;
    creditCard = faCreditCard;
    fixedPayment = faPiggyBank;
    creditCardDevil = faFrown;
    static clock = faClock;
    time = faClock;
    questionMark = faQuestionCircle;
    unhappy = faFrown;
    smile = faFaceSmile;
    faceMeh = faFaceMeh;
    minimumPaymentType = faFrown;
    trap = faExclamationTriangle;
    interestSaved = faSackDollar;
    static sackDollar = faSackDollar;
    financialEmancipation = faUniversity;
    static university = faUniversity;
    motivation = faBullhorn;
    static motivation = faBullhorn;
    taskBasedGoals = faCog;
    static taskBasedGoals = faCog;
    static cog = faCog;
    technology = faCode;
    static technology = faCode;
    static useWhatYouGot = faScrewdriverWrench;
    breakEvenUnits = faScaleBalanced;
    grossProfitPercent = faSackDollar;
    sackDollar = faSackDollar;
    priority = faCircle;
    static whatDidYouLearn = faGraduationCap;
    planning = faBrain;
    static wartsAndAllIcon = faFrog;
    twentyMinuteRule = faClock;
    static doesItHaveValue = faScaleBalanced;
    static magnifyGlassDolar = faMagnifyingGlassDollar;
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
    static noTimeWasting = faHourglassHalf;
    static restAndCelebrate = faBedPulse;
    interestRate = faPercent;
    calculator = faCalculator;
    commentDollar = faCommentDollar;
}