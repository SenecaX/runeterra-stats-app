import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { RuneterraService } from "src/app/services/runeterra.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: ["./user-profile.page.scss"],
})
export class UserProfilePage implements OnInit, OnChanges {
  constructor(public runeterraService: RuneterraService) {
    let obj = this.runeterraService.testingApi();

    console.log("obj", obj);
  }

  ngOnInit() {
    console.log("entered init");
    // this.runeterraService.testingApi();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("entered", changes);
  }
}
