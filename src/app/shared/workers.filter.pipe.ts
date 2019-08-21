import {Pipe, PipeTransform} from '@angular/core';
import {Worker} from './worker.service';

@Pipe({name: 'workersFilter'})
export class WorkersFilterPipe implements PipeTransform {
  transform(workers: Worker[], search: string = ''): Worker[] {
    if (!search.trim()) {
      return workers;
    }
    return workers.filter(worker => {
      return (worker.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        || (worker.salary.toString().indexOf(search) !== -1)
        || (worker.job.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    });
  }


}
