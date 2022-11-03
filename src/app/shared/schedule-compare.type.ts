//TODO should this be in shared, rethink
import { Schedule } from './schedule.class';

export class ScheduleCompare {
  schedule1!: Schedule;
  schedule2!: Schedule;
  interestDifference = 0;
  interestDifferencePercent = 0;
  monthsSaved = 0;
  periodsSavedText = '';
  years = 0;
}
