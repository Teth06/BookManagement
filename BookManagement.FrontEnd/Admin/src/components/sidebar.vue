<script>
import { ref, onMounted, watch } from "vue";
import simplebar from "simplebar-vue";
import LogoDark from "@/assets/images/logo-dark.svg";
import LogoWhite from "@/assets/images/logo-white.svg";
export default {
  setup() {
    const logo = ref(null);
    let isDarkTheme = document.body.getAttribute("data-pc-layout") === "dark";
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const updateLogo = () => {
      if (isDarkTheme) {
        logo.value.src = require("@/assets/images/logo-white.svg");
      } else {
        logo.value.src = require("@/assets/images/logo-dark.svg");
      }
    };
    const name = ref("Admin");
    const email = ref("admin@gmail.com");
    onMounted(() => {
      if (userInfo) {
        name.value = userInfo.FullName;
        email.value = userInfo.Email;
      }
      updateLogo();
    });

    watch(
      () => isDarkTheme,
      () => {
        updateLogo();
      }
    );

    return { logo, userInfo, name, email };
  },
  components: {
    simplebar,
  },
  data() {
    return {
      LogoDark,
      LogoWhite,
    };
  },
  methods: {
    changeLayoutType(layoutType) {
      // Update the layout type in the store
      this.$store.commit("changeLayoutType", { layoutType });

      // Set the layout attribute based on the layout type
      document.body.setAttribute("data-pc-layout", layoutType);
    },
  },
  computed: {
    // ...layoutComputed,
    layoutType: {
      get() {
        return this.$store.state.layout.layoutType;
      },
      set(layoutType) {
        this.$store.commit("changeLayoutType", { layoutType });
      },
    },
  },
  watch: {
    layoutType: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "horizontal":
              document.body.setAttribute("data-pc-layout", "horizontal");
              break;
            case "vertical":
              document.body.setAttribute("data-pc-layout", "vertical");
          }
        }
      },
    },
  },
  mounted() {
    this.isDarkTheme = document.body.getAttribute("data-pc-layout") === "dark";
    const activeListItem = document.querySelector("li.active");
    if (activeListItem) {
      const parentElementOrSelf = activeListItem?.parentElement
        ? activeListItem.parentElement
        : activeListItem;
      if (parentElementOrSelf && !parentElementOrSelf.classList.contains("pc-navbar")) {
        const closestItem = parentElementOrSelf.parentElement.closest(".pc-item");
        if (closestItem) {
          closestItem.classList.add("active");
        }
      }
    } else {
      console.error("No list item with class 'active' found.");
    }
  },
};
</script>

<template>
  <div class="navbar-wrapper" id="navbar-wrapper">
    <div class="m-header">
      <router-link to="/" class="b-brand text-primary">
        <img ref="logo" alt="logo image" class="logo-lg custom_logo" />
        <img src="@/assets/images/favicon.svg" alt="" class="logo logo-sm" />
      </router-link>
    </div>
    <simplebar data-simplebar style="height: 760px">
      <div class="navbar-content">
        <ul class="pc-navbar">
          <li class="pc-item" :class="{ active: this.$route.path === '/home' }">
            <router-link to="/home" class="pc-link">
              <span class="pc-micon">
                <i class="ph-duotone ph-projector-screen-chart"></i>
              </span>
              <span class="pc-mtext"> Trang chủ</span>
            </router-link>
          </li>
          <li class="pc-item" :class="{ active: this.$route.path === '/best-seller' }">
            <router-link to="/best-seller" class="pc-link">
              <span class="pc-micon">
                <i class="ph-duotone ph-database"></i>
              </span>
              <span class="pc-mtext">Sách bán chạy</span>
            </router-link>
          </li>
        <div class="card nav-action-card bg-brand-color-4">
          <div
            class="card-body"
            :style="{
              'background-image':
                'url(' + require('@/assets/images/layout/nav-card-bg.svg') + ')',
            }"
          >
            <h5 class="text-dark">Trung tâm trợ giúp</h5>
            <p class="text-dark text-opacity-75">
              Vui lòng liên hệ với chúng tôi nếu gần tự giúp đỡ
            </p>
            <router-link href="#" class="btn btn-primary" :to="{ path: '/contact-us' }"
              >Đến trung tâm trợ giúp</router-link
            >
          </div>
        </div>
      </ul>
      </div>
    </simplebar>
  </div>
  <BCard no-body class="pc-user-card">
    <BCardBody>
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <img
            src="@/assets/images/user/avatar-1.jpg"
            alt="user-image"
            class="user-avtar wid-45 rounded-circle"
          />
        </div>
        <div class="flex-grow-1 ms-3 me-2">
          <h6 class="mb-0">
            {{ name }}
          </h6>
          <small>{{ email }}</small>
        </div>
        <BDropdown variant="purple" dropup no-caret>
          <template v-slot:button-content>
            <span
              class="btn btn-icon btn-link-secondary avtar arrow-none dropdown-toggle"
            >
              <i class="ph-duotone ph-windows-logo"></i>
            </span>
          </template>
          <BRow xl="6">
            <BCol xl="6">
              <BDropdownItem class="pc-user-links p-0">
                <div class="align-middle">
                  <i class="ph-duotone ph-user"></i>
                  <br />
                  <span>My Account</span>
                </div>
              </BDropdownItem>
              <BDropdownDivider />
              <BDropdownItem class="pc-user-links p-0">
                <i class="ph-duotone ph-lock-key"></i> <br />
                <span>Lock Screen</span>
              </BDropdownItem>
              <BDropdownDivider />
            </BCol>
            <BCol xl="6">
              <BDropdownItem class="pc-user-links p-0">
                <i class="ph-duotone ph-gear"></i> <br />
                <span>Settings</span>
              </BDropdownItem>
              <BDropdownDivider />
              <BDropdownItem class="pc-user-links p-0">
                <i class="ph-duotone ph-power"></i> <br />
                <span>Logout</span>
              </BDropdownItem>
              <BDropdownDivider />
            </BCol>
          </BRow>
        </BDropdown>
      </div>
    </BCardBody>
  </BCard>
</template>

<style>
.pc-sidebar .card.pc-user-card {
  z-index: 1;
}
</style>
