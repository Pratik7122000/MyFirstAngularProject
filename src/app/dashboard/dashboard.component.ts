import {OnInit, AfterViewInit , Component, ViewChild} from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { EmployeedetailService } from '../service/employeedetail.service';
import { EmployeeInterface } from '../interfaces/employee';
import { first } from 'rxjs';
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
  labeldataP1: any[] = [];
  labeldataP2: any[] = [];
  taskGiven: any[] = [];
  taskCompleted: any[] = [];
  taskProgress: any[] = [];
  taskProgress1: any[] = [];
  taskProgress2: any[] = [];
  colordata: any[] = [];
  projectName: any[]=[];
  projectEntries =new Set();
  MultidataP1: any[][]=[];
  TotalProgressP1: number = 0;
  TotalProgressP2: number = 0;
  TotalTaskP1: number = 0;
  TotalTaskP2: number = 0;
  MultidataP2: any[][]=[];


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
          this.taskCompleted.push(this.userdata[i].taskCompleted);
          this.projectName.push(this.userdata[i].project);

          const prog=(this.userdata[i].taskCompleted/this.userdata[i].taskGiven)*100;
          this.taskProgress.push(prog);
          
          this.projectEntries.add(this.userdata[i].project);
          //  [ ... new Set(this.projectName)]
          const [first] = this.projectEntries;
          const [,second] = this.projectEntries;

          if(first==this.userdata[i].project)
          {
            this.MultidataP1.push([this.userdata[i].name,prog]);
            this.TotalTaskP1 = this.TotalTaskP1 + this.userdata[i].taskGiven;
            this.TotalProgressP1 = this.TotalProgressP1 + this.userdata[i].taskCompleted;
          }
          else if(second==this.userdata[i].project)
          {
             this.MultidataP2.push([this.userdata[i].name,prog]);
             this.TotalTaskP2 = this.TotalTaskP2 + this.userdata[i].taskGiven;
            this.TotalProgressP2 = this.TotalProgressP2 + this.userdata[i].taskCompleted;
          
          }
          else
          {
            console.log("New Project Detected: "+this.projectName)
          }
          const color= this.getRandomColor();
          this.colordata.push(color);
          console.log()
          
        }
        this.projectName = [ ... new Set(this.projectName)]

       this.RenderChart(this.labeldata,this.taskProgress,this.colordata);
        // Company 1,segregation from 2d to 1d
       for(let i=0; i<this.MultidataP1.length ;i++)
       {
        this.labeldataP1.push(this.MultidataP1[i][0])
        this.taskProgress1.push(this.MultidataP1[i][1])
       }
       // Company 2, segregation from 2d to 1d
       for(let i=0; i<this.MultidataP2.length ;i++)
       {
        this.labeldataP2.push(this.MultidataP2[i][0])
        this.taskProgress2.push(this.MultidataP2[i][1])
       }
       this.RenderChart2(this.labeldataP1,this.taskProgress1,this.colordata,this.projectName[0]);
       this.RenderChart3(this.labeldataP2,this.taskProgress2,this.colordata,this.projectName[1]);
       // Pie Chart  1
       this.RenderPieChart1((this.TotalProgressP1/this.TotalTaskP1)*100,
       ((this.TotalTaskP1-this.TotalProgressP1)/this.TotalTaskP1)*100,
       this.colordata,this.projectName[0]);
       // Pie Chart  1
       this.RenderPieChart2((this.TotalProgressP2/this.TotalTaskP2)*100,
       ((this.TotalTaskP1-this.TotalProgressP2)/this.TotalTaskP2)*100,
       this.colordata,this.projectName[1]);
       
       //console log 
       console.log(this.labeldata);
       console.log(this.taskProgress);
       console.log(this.colordata);
       console.log(this.projectName);
       console.log(this.projectEntries);
       console.log(this.MultidataP1[0][0]);
       console.log(this.MultidataP1[0][1]);
       
       console.table(this.labeldataP1)

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
  RenderChart2(labeldata:any,taskProgress:any,colordata:any,projectName:any) {
    
    const myChart = new Chart('barchart2', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: projectName,
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

  RenderChart3(labeldata:any,taskProgress:any,colordata:any,projectName:any) {
    const myChart = new Chart('barchart3', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: projectName,
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

  RenderPieChart1(TotalProgressP1:any,TotalTaskP1:any,colordata:any,projectName:any) {
    const myChart = new Chart('piechart1', {
      type: 'doughnut',
      data: {
        labels: [
          'Progress',
          'Remaining'
        ],
        datasets: [{
          label: '',
          data: [TotalProgressP1, TotalTaskP1],
          backgroundColor: colordata
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
  RenderPieChart2(TotalProgressP2:any,TotalTaskP2:any,colordata:any,projectName:any) {
    const myChart = new Chart('piechart2', {
      type: 'doughnut',
      data: {
        labels: [
          'Progress',
          'Remaining'
        ],
        datasets: [{
          label: '',
          data: [TotalProgressP2, TotalTaskP2],
          backgroundColor: colordata
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



