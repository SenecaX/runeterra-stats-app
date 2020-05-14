import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./components/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./components/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./components/registration/registration.module").then(
        m => m.RegistrationPageModule
      )
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./components/forgot-password/forgot-password.module").then(
        m => m.ForgotPasswordPageModule
      )
  },
  {
    path: "user-profile/:id",
    loadChildren: () =>
      import("./components/user-profile/user-profile.module").then(
        m => m.UserProfilePageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
