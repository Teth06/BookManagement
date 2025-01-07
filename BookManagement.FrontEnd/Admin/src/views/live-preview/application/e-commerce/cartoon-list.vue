<script setup>
import Layout from "@/layout/main.vue";
import pageheader from "@/components/page-header.vue";
import { onMounted, ref } from "vue";
import { BookApi } from "@/apis/bookApi";
import { useRouter } from "vue-router";
import { CategoryApi } from "@/apis/categoryApi";
import { TopicBookApi } from "@/apis/topicBookApi";
import { CartApi } from "@/apis/cartApi";
import { CartItemApi } from "@/apis/cartItemApi";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const loading = ref(false);
const time = ref();
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const cart = ref({});
const router = useRouter();
const dataProducts = ref([]);
// const businessExecute = ref(filterProductRequest);
const dataCategories = ref([]);
const dataTopicBooks = ref([]);
const businessExecuteCartItem = ref({
  cartId: null,
  bookId: null,
});

const businessExecuteFilter = ref({
  keyword: "",
  priceFrom: null,
  priceTo: null,
  categoryId: 11,
  topicBookId: null,
});

const createCartItem = async (bookId) => {
  loading.value = true;
  if (!userInfo) {
    toast("Bạn cần phải đăng nhập trước", {
      type: "error",
      transition: "flip",
      theme: "dark",
      autoClose: 1500,
      dangerouslyHTMLString: true,
    });
    router.push("/login-v1");
    return;
  }
  businessExecuteCartItem.value.bookId = bookId;
  const result = await CartItemApi.createCartItem(businessExecuteCartItem.value);

  if (result.data.succeeded === true) {
    toast("Thêm vào giỏ hàng thành công", {
      type: "success",
      transition: "flip",
      autoClose: 1500,
      theme: "dark",
      dangerouslyHTMLString: true,
    });
    time.value = setTimeout(() => {
      router.push("/home");
    }, 1500);
  } else {
    toast(result.data.error[0], {
      type: "error",
      transition: "flip",
      theme: "dark",
      autoClose: 1500,
      dangerouslyHTMLString: true,
    });
  }
  loading.value = false;
};

const getAllBooks = async () => {
  const result = await BookApi.getAllBooks(businessExecuteFilter.value);
  console.log(businessExecuteFilter.value);
  dataProducts.value = result.data.dataResponseBooks;
};
const businessExecuteCategory = ref({
  name: "",
});
const businessExecuteTopicBook = ref({
  name: "",
});

const getCartByUserId = async () => {
  if (userInfo) {
    const result = await CartApi.getCartByUserId(userInfo.Id);
    cart.value = result.data.dataResponseCart;
  }
};

const getAllCategories = async () => {
  const result = await CategoryApi.getAllCategories(businessExecuteCategory.value);
  dataCategories.value = result.data.dataResponseCategories;
};

const getAllTopicBooks = async () => {
  const result = await TopicBookApi.getAllTopicBooks(businessExecuteTopicBook.value);
  dataTopicBooks.value = result.data.dataResponseTopicBooks;
};

const viewBook = (id) => {
  router.push({
    name: "product-details",
    params: { id },
  });
};
const formatCurrency = (value) => {
  if (value === undefined || value === null) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

onMounted(async () => {
  await getAllBooks();
  await getAllCategories();
  await getAllTopicBooks();
  await getCartByUserId();
  if (cart.value.id !== undefined) {
    businessExecuteCartItem.value.cartId = cart.value.id;
  }
});
</script>

<template>
  <Layout>
    <pageheader title="Home" page-title="UI" />
    <div class="d-flex mb-4">
      <div>
        <img
          width="100%"
          src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangCTthang10_Mainbanner_15_10_APP_840x320.png"
          alt="img"
          class="img-fluid img-bg"
        />
      </div>
      <div>
        <img
          width="100%"
          src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangCTthang10_Mainbanner_15_10_APP_840x320.png"
          alt="img"
          class="img-fluid img-bg"
        />
      </div>
      <div>
        <img
          width="100%"
          src="https://cdn0.fahasa.com/media/magentothem/banner7/TrangCTthang10_Mainbanner_15_10_APP_840x320.png"
          alt="img"
          class="img-fluid img-bg"
        />
      </div>
    </div>
    <BRow>
      <div class="col-sm-12">
        <div class="ecom-wrapper">
          <div class="ecom-content" style="width: 100%">
            <div class="d-sm-flex align-items-center mb-4">
              <ul class="list-inline me-auto my-1">
                <li class="list-inline-item">
                  <form class="form-search">
                    <i class="ph-duotone ph-magnifying-glass icon-search"></i>
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Tìm kiếm"
                      v-model="businessExecuteFilter.keyword"
                    />
                  </form>
                </li>
              </ul>
              <ul class="list-inline ms-auto my-1">
                <li class="list-inline-item align-bottom">
                  <BButton variant="link-secondary" v-b-toggle.collapse-3 class="m-1">
                    <i class="ti ti-filter f-16"></i>Filter</BButton
                  >
                </li>
              </ul>
            </div>
            <BRow>
              <BCol v-for="item in dataProducts" :key="item.id" class="col-sm-6 col-xl-4">
                <BCard no-body class="product-card">
                  <div class="card-img-top">
                    <div class="image-container">
                      <img :src="item.imageUrl" alt="image" class="img-prod img-fluid" />
                    </div>
                    <BCardBody class="position-absolute end-0 top-0">
                      <div class="form-check prod-likes">
                        <input type="checkbox" class="form-check-input" />
                        <i data-feather="heart" class="prod-likes-icon"></i>
                      </div>
                    </BCardBody>
                  </div>
                  <BCardBody>
                    <div>
                      <p class="prod-content mb-0 text-muted">{{ item.name }}</p>
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-between mt-2 mb-3 flex-wrap gap-1"
                    >
                      <h4
                        class="mb-0 text-truncate"
                        style="display: flex; flex-direction: column"
                      >
                        <b>{{ formatCurrency(item.price) }} VND</b>
                        <span
                          class="text-sm text-muted f-w-400 text-decoration-line-through"
                        >
                          {{ formatCurrency(item.priceAfterDiscount) }} VND
                        </span>
                      </h4>
                      <div class="d-inline-flex align-items-center">
                        <i class="ph-duotone ph-star text-warning me-1"></i>
                        {{ item.averageRating }} <small class="text-muted">/ 5</small>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0">
                        <button
                          class="avtar avtar-s btn-link-secondary btn-prod-card"
                          @click="viewBook(item.id)"
                        >
                          <i class="ph-duotone ph-eye f-18"></i>
                        </button>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <div class="d-grid">
                          <button
                            class="btn btn-link-secondary btn-prod-card"
                            @click="createCartItem(item.id)"
                          >
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </BCardBody>
                </BCard>
              </BCol>
            </BRow>
          </div>
        </div>
      </div>
    </BRow>
  </Layout>
</template>
<style scoped>
.image-container {
  width: 100%;
  padding-top: 75%; /* 4:3 aspect ratio (adjust as needed) */
  position: relative;
  overflow: hidden;
}

.img-prod {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
