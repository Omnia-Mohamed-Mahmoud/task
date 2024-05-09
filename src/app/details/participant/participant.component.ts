import { participant } from './../../Data/Participant';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ParticipantService } from '../../service/participant.service';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

interface gender {
  label: string;
  value: string;
}

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css',
  providers:[ParticipantService],
  standalone:true,
  imports:[InputNumberModule,DropdownModule,DialogModule,ButtonModule,FormsModule,TableModule,HttpClientModule,InputIconModule,InputTextModule,IconFieldModule,TagModule]
})
export class ParticipantComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  globalFilterValue: string = '';

  participants: participant[] = [];

  SelectGender: any | undefined;
  options:gender[] | undefined;
  first = 0;
  selectedParticipants!: participant;

  newParticipantName:string='';

  newPSchool:string='';

  minValue: number = 5;
  value:number=6;
  maxValue: number = 18;

  progressValue:any|undefined;
  progress=[
    {label:'Completed' , value:'completed'},
    {label:'Danger' , value:'danger'},
    {label:'Pending' , value:'pending'}
  ];

  visible: boolean = false;

 showDialog() {
      this.visible = true;
  }
    constructor(private ParticipantService: ParticipantService) {}

    ngOnInit() {
      this.options = [
        {label:'Female' , value:'F'},
        {label:'Male' , value:'M'}
      ];

        this.ParticipantService.getCustomersMini().then((data) => (this.participants = data));
   }

  //  ngOnChanges(changes: SimpleChanges) {
  //   this.ParticipantService.getCustomersMini().then((data) => (this.participants = data));
  //   console.log('x'+changes);
  // }

    applyGlobalFilter() {
      this.dt1.filterGlobal(this.globalFilterValue, 'contains');
  }

  clearFilters() {
    this.globalFilterValue = '';
    this.dt1.reset();
  }

    getSeverity(status: string): string | undefined {
        switch (status) {
          case 'rejected':
            return 'danger';

          case 'completed':
              return 'success';

          case 'pending':
              return 'info';

          default:
              return undefined;
        }
    }

    cancel() {
      this.newParticipantName='';
      this.newPSchool='';
      this.SelectGender.value='';
      this.value=6;
      this.progressValue.value='';
      this.visible = false;
    };

    saveParticipant() {
      const newParticipant: participant = {
        id: this.participants.length + 1,
        Name: this.newParticipantName,
        school: this.newPSchool,
        gender: this.SelectGender?.value,
        age: this.value,
        progress: this.progressValue?.value,
      }
      console.log(this.participants);
      this.ParticipantService.addParticipant(newParticipant)
      .then((updatedParticipants) => {
        // Update the local participants array with the updated list
        this.participants = updatedParticipants;
        this.cancel(); // Reset form fields
      })
      .catch((error) => {
        console.error('Error adding participant:', error);
      });
       console.log(this.ParticipantService.addParticipant(newParticipant));
      this.cancel();
    }

    deleteParticipant(id: number): void {
      this.ParticipantService.deleteParticipant(id).then(() => {
        this.ParticipantService.getCustomersMini().then((data) => (this.participants = data));
      }).catch((error) => {
        console.error('Error deleting participant:', error);
      });
    }
  }
