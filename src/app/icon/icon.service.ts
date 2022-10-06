import { Injectable } from '@angular/core';
import {
    faCheckSquare, faTrashAlt, faArrowAltCircleLeft,
    faArrowAltCircleRight, faPlusSquare, faSmile,
    faCalendarCheck,
    faWindowClose, faQuestionCircle
} from '@fortawesome/free-regular-svg-icons';
import {
    faGraduationCap, faFrog, faChalkboardTeacher,
    faGlassCheers, faCircle, faArrowDown, faArrowUp, faEllipsisH,
    faTasks, faPencilAlt, faBug, faSearchDollar, faVial, faExpandArrowsAlt,
    faBrain, faInfoCircle, faClipboardList, faChartPie,faSackDollar, faScaleBalanced,
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    breakEvenUnits = faScaleBalanced;
    grossProfitPercent =faSackDollar;
    sackDollar = faSackDollar;
    priority = faCircle;
    learnIcon = faGraduationCap;
    planning = faBrain;
    wartsAndAllIcon = faFrog;
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