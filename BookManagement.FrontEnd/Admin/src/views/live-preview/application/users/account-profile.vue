<script setup>
import Layout from "@/layout/main.vue"
import pageheader from "@/components/page-header.vue"
import { AuthApi } from "@/apis/authApi";
import { useRouter } from "vue-router";
import {onMounted, ref} from 'vue';
import { changePasswordRequest } from "@/interfaces/requestModels/user/changePasswordRequest";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const dataUser = ref({});
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const loading = ref(false);
const router = useRouter();
const getUserById = async () => {
  const result = await AuthApi.getUserById(userInfo.Id);
  dataUser.value = result.data.dataResponseUser
  console.log(dataUser.value);
}
const businessExecute = ref(changePasswordRequest);
const changePassword = async () => {
  loading.value = true;
  const result = await AuthApi.changePassword(businessExecute.value);
  if(result.error !== undefined){
    toast(result.error, {
      type: "error",
      transition: "flip",
      theme: "dark",
      "autoClose": 1500,
      dangerouslyHTMLString: true,
    });
  }else{
    if (result.data.succeeded === true) {
    toast("Đổi mật khẩu thành công", {
      type: "success",
      transition: "flip",
      "autoClose": 1500,
      theme: "dark",
      dangerouslyHTMLString: true,
    });
    setTimeout(() => {
      router.push('/account-profile');
    }, 1500);
  } else {
    toast(result.data.error[0], {
      type: "error",
      transition: "flip",
      theme: "dark",
      "autoClose": 1500,
      dangerouslyHTMLString: true,
    });
  }
  }

  loading.value = false;
};
onMounted(async () => {
  console.log(userInfo)
  getUserById();
});

</script>

<template>
    <Layout>
        <pageheader title="Thông tin tài khoản" pageTitle="Users" />
        <BRow>
            <BCol class="col-sm-12">
                <BRow>
                    <BCol class="col-lg-5 col-xxl-3">
                        <BCard no-body class="overflow-hidden">
                            <BCardBody class="position-relative">
                                <div class="text-center mt-3">
                                    <div class="chat-avtar d-inline-flex mx-auto">
                                        <img class="rounded-circle img-fluid wid-90 img-thumbnail" src="@/assets/images/user/avatar-1.jpg" alt="User image">
                                        <i class="chat-badge bg-success me-2 mb-2"></i>
                                    </div>
                                    <h5 class="mb-0">{{ dataUser.fullName }}</h5>
                                    <p class="text-muted text-sm"> {{dataUser.nickName}}
                                        </p>
                                    <ul class="list-inline mx-auto my-4">
                                        <li class="list-inline-item">
                                            <a href="#" class="avtar avtar-s text-white bg-dribbble">
                                                <i class="ti ti-brand-dribbble f-24"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="avtar avtar-s text-white bg-amazon">
                                                <i class="ti ti-brand-figma f-24"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="avtar avtar-s text-white bg-pinterest">
                                                <i class="ti ti-brand-pinterest f-24"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="avtar avtar-s text-white bg-behance">
                                                <i class="ti ti-brand-behance f-24"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <BRow class="g-3">
                                        <BCol class="col-4">
                                            <h5 class="mb-0">86</h5>
                                            <small class="text-muted">Đã mua</small>
                                        </BCol>
                                        <BCol class="col-4 border border-top-0 border-bottom-0">
                                            <h5 class="mb-0">40</h5>
                                            <small class="text-muted">Đã hủy</small>
                                        </BCol>
                                        <BCol class="col-4">
                                            <h5 class="mb-0">2</h5>
                                            <small class="text-muted">Trả hàng</small>
                                        </BCol>
                                    </BRow>
                                </div>
                            </BCardBody>
                            <div class="nav flex-column nav-pills list-group list-group-flush account-pills mb-0" id="user-set-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link list-group-item list-group-item-action active" id="user-set-profile-tab" data-bs-toggle="pill" href="#user-set-profile" role="tab" aria-controls="user-set-profile" aria-selected="true">
                                    <span class="f-w-500"><i class="ph-duotone ph-user-circle m-r-10"></i>Tổng quan</span>
                                </a>
                                <a class="nav-link list-group-item list-group-item-action" id="user-set-information-tab" data-bs-toggle="pill" href="#user-set-information" role="tab" aria-controls="user-set-information" aria-selected="false">
                                    <span class="f-w-500"><i class="ph-duotone ph-clipboard-text m-r-10"></i>Thông tin cá nhân</span>
                                </a>
                                <a class="nav-link list-group-item list-group-item-action" id="user-set-passwort-tab" data-bs-toggle="pill" href="#user-set-passwort" role="tab" aria-controls="user-set-passwort" aria-selected="false">
                                    <span class="f-w-500"><i class="ph-duotone ph-key m-r-10"></i>Đổi mật khẩu</span>
                                </a>
                            </div>
                        </BCard>
                        <BCard no-body>
                            <BCardHeader>
                                <h5>Thông tin cá nhân</h5>
                            </BCardHeader>
                            <BCardBody class="position-relative">
                                <div class="d-inline-flex align-items-center justify-content-between w-100 mb-3">
                                    <p class="mb-0 text-muted me-1">Email</p>
                                    <p class="mb-0">{{ dataUser.email }}</p>
                                </div>
                                <div class="d-inline-flex align-items-center justify-content-between w-100 mb-3">
                                    <p class="mb-0 text-muted me-1">Số điện thoại</p>
                                    <p class="mb-0">{{dataUser.phoneNumber}}</p>
                                </div>
                                <div class="d-inline-flex align-items-center justify-content-between w-100">
                                    <p class="mb-0 text-muted me-1">Vị trí</p>
                                    <p class="mb-0">Việt Nam</p>
                                </div>
                            </BCardBody>
                        </BCard>
                    </BCol>
                    <BCol class="col-lg-7 col-xxl-9">
                        <div class="tab-content" id="user-set-tabContent">
                            <div class="tab-pane fade show active" id="user-set-profile" role="tabpanel" aria-labelledby="user-set-profile-tab">
                                <BCard no-body>
                                    <BCardHeader>
                                        <h5>Thông tin chi tiết</h5>
                                    </BCardHeader>
                                    <BCardBody>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item px-0 pt-0">
                                                <BRow>
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Họ và tên</p>
                                                        <p class="mb-0">{{dataUser.fullName}}</p>
                                                    </BCol>
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Nick name</p>
                                                        <p class="mb-0">{{ dataUser.nickName }}</p>
                                                    </BCol>
                                                </BRow>
                                            </li>
                                            <li class="list-group-item px-0">
                                                <BRow>
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Số điện thoại</p>
                                                        <p class="mb-0">{{dataUser.phoneNumber}}</p>
                                                    </BCol>
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Quốc gia</p>
                                                        <p class="mb-0">Việt Nam</p>
                                                    </BCol>
                                                </BRow>
                                            </li>
                                            <li class="list-group-item px-0">
                                                <BRow class="row">
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Email</p>
                                                        <p class="mb-0">{{dataUser.email}}</p>
                                                    </BCol>
                                                    <BCol class="col-md-6">
                                                        <p class="mb-1 text-muted">Pin Code</p>
                                                        <p class="mb-0">{{dataUser.pinCode}}</p>
                                                    </BCol>
                                                </BRow>
                                            </li>
                                            <li class="list-group-item px-0 pb-0">
                                                <p class="mb-1 text-muted">Địa chỉ</p>
                                                <p class="mb-0"></p>
                                            </li>
                                        </ul>
                                    </BCardBody>
                                </BCard>
                            </div>
                            <div class="tab-pane fade" id="user-set-information" role="tabpanel" aria-labelledby="user-set-information-tab">
                                <BCard no-body>
                                    <BCardHeader>
                                        <h5>Thông tin cá nhân</h5>
                                    </BCardHeader>
                                    <BCardBody class="card-body">
                                        <BRow>
                                            <BCol class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="form-label">Họ và tên</label>
                                                    <input type="text" class="form-control" v-model="dataUser.fullName">
                                                </div>
                                            </BCol>
                                            <BCol class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="form-label">Quốc gia</label>
                                                    <input type="text" class="form-control" value="VD: Viet Nam">
                                                </div>
                                            </BCol>
                                            <BCol class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="form-label">Zip code</label>
                                                    <input type="text" class="form-control" :value="dataUser.pinCode">
                                                </div>
                                            </BCol>
                                          <BCol class="col-sm-6">
                                            <div class="form-group">
                                                <label class="form-label">Giới tính</label>
                                                <input type="text" class="form-control" :value="dataUser.gender">
                                            </div>
                                        </BCol>
                                    <BCol class="col-sm-6">
                                      <div class="form-group">
                                          <label class="form-label">Point</label>
                                          <input type="text" class="form-control" :value="dataUser.point">
                                      </div>
                                  </BCol>

                                  <BCol class="col-sm-6">
                                    <div class="form-group">
                                        <label class="form-label">Nick name</label>
                                        <input type="text" class="form-control" :value="dataUser.nickName">
                                    </div>
                                </BCol>
                                        </BRow>
                                    </BCardBody>
                                </BCard>
                                <BCard no-body>
                                    <BCardHeader>
                                        <h5>Thông tin liên hệ</h5>
                                    </BCardHeader>
                                    <BCardBody>
                                        <BRow>
                                            <BCol class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="form-label">Số điện thoại</label>
                                                    <input type="text" class="form-control" v-model="dataUser.phoneNumber">
                                                </div>
                                            </BCol>
                                            <BCol class="col-sm-6">
                                                <div class="form-group">
                                                    <label class="form-label">Email <span class="text-danger">*</span></label>
                                                    <input type="email" class="form-control"  v-model="dataUser.email">
                                                </div>
                                            </BCol>
                                            <BCol class="col-sm-12">
                                                <div class="form-group mb-0">
                                                    <label class="form-label">Địa chỉ</label>
                                                    <textarea class="form-control"></textarea>
                                                </div>
                                            </BCol>
                                        </BRow>
                                    </BCardBody>
                                </BCard>
                                <div class="text-end btn-page">
                                    <div class="btn btn-outline-secondary">Thoát</div>
                                    <div class="btn btn-primary">Cập nhật hồ sơ</div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="user-set-passwort" role="tabpanel" aria-labelledby="user-set-passwort-tab">
                                <BCard no-body>
                                    <BCardHeader>
                                        <h5>Đổi mật khẩu</h5>
                                    </BCardHeader>
                                    <BCardBody>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item pt-0 px-0">
                                                <div class="form-group row mb-0">
                                                    <BCol class="col-form-label col-md-4 col-sm-12 text-md-end">
                                                      Mật khẩu <span class="text-danger">*</span>
                                                    </BCol>
                                                    <BCol class="col-md-8 col-sm-12">
                                                        <input type="password" class="form-control" v-model="businessExecute.oldPassword">
                                                        <div class="form-text">  <a href="#" class="link-primary">Quên mật khẩu?</a>
                                                        </div>
                                                    </BCol>
                                                </div>
                                            </li>
                                            <li class="list-group-item px-0">
                                                <BRow class="form-group row mb-0">
                                                    <BCol class="col-form-label col-md-4 col-sm-12 text-md-end">Mật khẩu mới <span class="text-danger">*</span></BCol>
                                                    <BCol class="col-md-8 col-sm-12">
                                                        <input type="password" class="form-control" v-model="businessExecute.newPassword">
                                                    </BCol>
                                                </BRow>
                                            </li>
                                            <li class="list-group-item pb-0 px-0">
                                                <BRow class="form-group mb-0">
                                                    <BCol class="col-form-label col-md-4 col-sm-12 text-md-end">Xác nhận mật khẩu <span class="text-danger">*</span></BCol>
                                                    <BCol class="col-md-8 col-sm-12">
                                                        <input type="password" class="form-control" v-model="businessExecute.confirmPassword">
                                                    </BCol>
                                                </BRow>
                                            </li>
                                        </ul>
                                    </BCardBody>
                                </BCard>
                                <BCard no-body>
                                    <BCardBody class="text-end">
                                        <div class="btn btn-outline-secondary me-2">Thoát</div>
                                        <div class="btn btn-primary" @click="changePassword">Xác nhận</div>
                                    </BCardBody>
                                </BCard>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BCol>
        </BRow>
    </Layout>
</template>
