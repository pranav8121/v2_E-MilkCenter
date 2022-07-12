import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {
  dropdownOptions:any=["सुग्रास", "टि.एम.आर", "फर्टिमन प्लस","फर्टिमन", "भेट शुल्क", "इतर"];
  constructor() { }

  ngOnInit(): void {
  }

}
