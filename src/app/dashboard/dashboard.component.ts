import {OnInit, AfterViewInit , Component, ViewChild} from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private service: EmployeedetailService) { }
 // dataSource:any;
  userdata!: EmployeeInterface[];
  labeldata: any[] = [];
  taskGiven: any[] = [];
  taskCompleted: any[] = [];
  taskProgress: any[] = [];
  colordata: any[] = [];

  ngOnInit(): void {
    this.Getallemployee();
  }

  Getallemployee() {
    this.service.GetallEmployee().subscribe((data : EmployeeInterface[]) => {
      console.log(data);
      this.userdata = data;
      console.log(this.userdata);

      if(this.userdata!=null){
        for(let i=0; i<this.userdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.userdata[i].name);
          this.taskGiven.push(this.userdata[i].taskGiven);
          this.taskGiven.push(this.userdata[i].taskCompleted);
          const prog=(this.userdata[i].taskCompleted/this.userdata[i].taskGiven)*100;
          this.taskProgress.push(prog);
          const color= this.getRandomColor();
          this.colordata.push(color);
          console.log()
        }
       this.RenderChart(this.labeldata,this.taskProgress,this.colordata);
        
       console.log(this.labeldata);
       console.log(this.taskProgress);
       console.log(this.colordata);
      }
      
    });
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
    }

  RenderChart(labeldata:any,taskProgress:any,colordata:any) {
    
    
    const myChart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Individual PRogress',
          data: taskProgress,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }



  }



