import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flashes',
  templateUrl: './flashes.component.html',
  styleUrls: ['./flashes.component.css']
})
export class FlashesComponent implements OnInit {

  currentParamId:number;
  currentParamType:number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params.subscribe((params)=>{
      this.currentParamId = params.id;
      this.currentParamType = params.type;
  });
}

  ngOnInit() {
  }

  goBack()
  {
    if(this.currentParamType==1)
    {
      this.router.navigate(['/thread',this.currentParamId]);
    }
  }

}
