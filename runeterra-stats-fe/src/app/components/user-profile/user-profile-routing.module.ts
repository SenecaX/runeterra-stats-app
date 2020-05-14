import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserProfilePage } from "./user-profile.page";
import { AuthGuard } from "src/app/shared/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: UserProfilePage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfilePageRoutingModule {}
