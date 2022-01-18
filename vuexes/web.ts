import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import Swal from 'sweetalert2'

@Module({ generateMutationSetters: true })
class WebModule extends VuexModule {
  public loading: boolean = false;
  public loadTxt: any = 'Loading..'

  public snackTxt:any = ''
  public snacking: boolean = false;
  public snackColor: any = 'success';

  public async onSnack(txt:string,color:string = 'success'){
    await this.offSnack()
    this.snacking = true
    this.snackTxt = txt
    this.snackColor = color
  }
  public async offSnack(){
    this.snacking = false
  }


  public async switchLoad(load: boolean) {
    //  this.loadTxt = 'กำลังโหลด'
    this.loading = load
  }

  public async onLoad(txt: string) {
    this.loadTxt = txt
    this.loading = true
  }

  public async offLoad() {
    this.loading = false
  }

  public async alert(title: any = 'OK', type: any = 'success',  text: any = '') {
    await Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: `OK`, 
    })
  }

  public async confirm(title: any = 'Are you sure ?') {
   let check =  await Swal.fire({
      title:title, 
      showCancelButton: true,
      confirmButtonText: `OK`,
      cancelButtonText: `Cancel`,
    }).then((result) => {
       return result.isConfirmed
    })

    return check
  }





}

import store from "@/vuexes"
export const Web = new WebModule({ store, name: "Web" })