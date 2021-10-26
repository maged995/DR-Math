import { NbMenuItem } from '@nebular/theme';
import { title } from 'process';
import { roleMatch } from '../shared/roleMatch.roles';
import { NbMenuItemWithPermissions } from './pagesClass';

export const MENU_ITEMS: NbMenuItemWithPermissions[] = [
{
title:'البيانات الاساسيه',
icon:'shopping-cart-outline',
hidden:!roleMatch(["levels","items","trainers"]),
children:[
  {
    title:'المستويات',
    link:'/pages/basicData/levels',
    hidden:!roleMatch(["levels"]),

  },

  {
  title:"الاصناف",
  hidden:!roleMatch(["items"]),

  children:[
    {
      title:'الكتب',
      link:'/pages/basicData/items/1'
    },
    {
      title:'عدادات',
      link:'/pages/basicData/items/2'
    },
    {
      title:'حقائب',
      link:'/pages/basicData/items/3'
    },
    {
      title:'تيشرتات',
      link:'/pages/basicData/items/4'
    },
    {
      title:'ميداليات',
      link:'/pages/basicData/items/5'
    },
    {
      title:'دروع',
      link:'/pages/basicData/items/6'
    },
    {
      title:'اخري',
      link:'/pages/basicData/items/7'
    }
  ]
  },

  {
    title:'المدربين',
    link:'/pages/basicData/trainers/1',
    hidden:!roleMatch(["trainers"]),

  },
  {
    title:'الموظفين',
    link:'/pages/basicData/trainers/2',
    hidden:!roleMatch(["trainers"]),

  },
 


]
},
{
title:"المشتركين",
icon:'shopping-cart-outline',
hidden:!roleMatch(["subscriber"]),

children:[

  {

    title:'الطلاب',
    link:'/pages/basicData/subscriber/1'
  },
  {
    title:'حضانه',
    link:'/pages/basicData/subscriber/2'
  },
  {
    title:'مدرسه',
    link:'/pages/basicData/subscriber/3'
  },
  {
    title:'كورس',
    link:'/pages/basicData/subscriber/4'
  }

]
},
{
title:"طلبات الاوردور",
icon:'shopping-cart-outline',
hidden:!roleMatch(["ordersForm","orderList","trainerPayment","trainerAccountReports"]),

children:[
  {
    title:'طلب المدرب',
    link:'/pages/basicData/ordersForm',
    hidden:!roleMatch(["ordersForm"]),
  },
  {
    title:'اعتماد الاداره',
    link:'/pages/basicData/orderList',
    hidden:!roleMatch(["orderList"]),

  },
  {
    title:'مدفوعات المدرب',
    link:'/pages/basicData/trainerPayment',
    hidden:!roleMatch(["trainerPayment"]),

  },
  {
    title:'حساب المدرب',
    link:'/pages/basicData/trainerAccountReports',
    hidden:!roleMatch(["trainerAccountReports"]),

  }
]

},
{
  title:'خرائط توضيحيه',
  icon:'shopping-cart-outline',
  hidden:!roleMatch(["mapsTrainer","mapsAdmin","mapsByTrainer"]),
  children:[
    {
      title:'اماكن المتدربين للمدرب',
      link:'/pages/basicData/mapsTrainer',
      hidden:!roleMatch(["mapsTrainer"]),

    },
    {
      title:'اماكن المتدربين لمحافظة المدرب',
      link:'/pages/basicData/mapsGovernorate',
      hidden:!roleMatch(["mapsTrainer"]),

    },

    {
      title:'اماكن المتدربين للادمن',
      link:'/pages/basicData/mapsAdmin',
      hidden:!roleMatch(["mapsAdmin"]),

    },
    {
      title:'اماكن المتدربين لمدرب واحد',
      link:'/pages/basicData/mapsByTrainer',
      hidden:!roleMatch(["mapsByTrainer"]),

    },
    
  ]
},
{
  title: 'تقارير شامله',
  icon: 'shopping-cart-outline',
  hidden:!roleMatch(["reports","StudentsFinished"]),
  children:[
{
  title:'تقارير  عن فتره معينه',
  link:'/pages/basicData/reports',
  hidden:!roleMatch(["reports"]),

},
{
  title:'طلاب انهوا التدريب',
  link:'/pages/basicData/StudentsFinished',
  hidden:!roleMatch(["StudentsFinished"]),
},
{
  title:'حسابات المدربين',
  link:'/pages/basicData/trainerAccount'
}

  ]
},

  {
    title: 'الامان',
    icon: 'shopping-cart-outline',
// hidden:!roleMatch(["UserRoles","Roles","RegisterNewUser"]),
    children: [
      {
title:'تغيير كلمة السر',
link:'/users/changePassword',

      },
      {
title:"تغيير صلاحية المستخدمين",
link:'/pages/security/userRolesList',
hidden:!roleMatch(["UserRoles"])

      },
      {
      title:'رتب الامان',
      link:'/pages/security/roles',
   hidden:!roleMatch(["Roles"])
      },
      {
        title:'اضافة مستخدم جديد',
        link:'/users/register',
          hidden:!roleMatch(["RegisterNewUser"])
      }
    ],
  },



  
]; 


      

