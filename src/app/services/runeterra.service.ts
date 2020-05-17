import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { interval } from "rxjs";
import { flatMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RuneterraService {
  endpoint: string = "/api";
  constructor(private http: HttpClient) {}

  testingApi() {
    console.log("entered test api");

    let apiUrl = "/static";
    let apiUrlPosition = "/positional-rectangles";
    let apiGameResult = "/game-result";
    // return this.http.get(apiUrl).subscribe((res) => {
    //   console.log("res", res);
    // });

    return interval(3000)
      .pipe(flatMap(() => this.http.get(this.endpoint + "/static")))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
