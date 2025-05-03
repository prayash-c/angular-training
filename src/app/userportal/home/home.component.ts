import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { userinfo } from 'src/app/models/api';
import { LoaderService } from 'src/app/loader/loader.service';
import { CommonToastr } from 'src/app/toastr/common.toastr';
import { StaysRes } from 'src/app/models/stays.model';
import { HotelInfoService } from 'src/app/services/hotel-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loadingState: boolean = true;
  stays: StaysRes[] = [];
  staysOptionClick: boolean = false;
  selectedStay: string = '';
  userInfo: userinfo = {
    aboutMe: '',
    contact: '',
    email: '',
    id: 0,
    name: '',
    profilePicUrl: null,
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    public loaderService: LoaderService,
    private commonToastr: CommonToastr,
    private hotelInfoServcie: HotelInfoService
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.commonToastr.toastrSuccess('logged in successfully!');
    this.setHotelInfoLS();
    this.fetchUserDetails();
    this.getLoading();
    this.fetchUserStays();
  }

  getLoading() {
    this.loaderService.loadingEvent.subscribe({
      next: (res: boolean) => {
        this.loadingState = res;
      },
    });
  }

  setHotelInfoLS() {
    const stay = localStorage.getItem('selectedStay');
    if (stay) {
      const hotel = JSON.parse(stay);
      this.selectedStay = hotel.hotelName;
      localStorage.setItem('hotelId', hotel.hotel);
      localStorage.setItem('stayId', hotel.id);
    }
  }

  fetchUserDetails() {
    this.loaderService.setLoadingState(true);

    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userInfo.id = res.id;
        this.userInfo.name = res.name;
        this.userInfo.email = res.email;
        this.userInfo.contact = res.contact;
        this.userInfo.profilePicUrl = res.profilePictureUrl;

        this.loaderService.setLoadingState(false);
      },
      error: (err: any) => {
        this.loaderService.setLoadingState(false);
        if (err.status === 401) {
          console.log('Token Expired!');
        }
        console.log('error getting user details', err);
      },
    });
  }

  fetchUserStays() {
    this.apiService.getStays().subscribe({
      next: (res: any) => {
        this.stays = res.staysResponse;
      },
    });
  }

  staysOption() {
    this.staysOptionClick = !this.staysOptionClick;
  }

  selectedStaysFn(selected: string) {
    this.selectedStay = selected;
    const selectedStay = this.stays.findIndex(
      (hotel) => hotel.hotelName === this.selectedStay
    );
    localStorage.setItem(
      'selectedStay',
      JSON.stringify(this.stays[selectedStay])
    );
    this.setHotelInfoLS();
  }

  edit() {
    this.router.navigate(['edit']);
  }

  meeting() {
    this.router.navigate(['meeting']);
  }
}
