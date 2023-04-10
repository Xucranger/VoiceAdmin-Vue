<template>
  <a-form class="smart-query-form">
    <a-row class="smart-query-form-row">
      <VCascader></VCascader>


      <!--选择声音-->
      <a-form-item label="采样频率" class="smart-query-form-item">
        <a-input style="width: 100px" v-model:value="queryForm.keywords"  />
      </a-form-item>

      <a-form-item label="采样点数" class="smart-query-form-item">
        <a-input style="width: 100px" v-model:value="queryForm.keywords" />
      </a-form-item>


      <a-form-item class="smart-query-form-item smart-margin-left10">
        <a-button type="primary" @click="showUploadModal" >
          <template #icon>
            <cloud-upload-outlined />
          </template>
          上传文件
        </a-button>
        <a-button-group>
          <a-button  @click="onSearch">
            <template #icon>
              <ChromeOutlined />
            </template>
            解析
          </a-button>
          <a-button @click="onReload">
            <template #icon>
              <PlayCircleOutlined />
            </template>
            播放
          </a-button>

        </a-button-group>
      </a-form-item>
      <a-button type="primary" @click="showUploadModal"  class="smart-query-form-item check-button" >
        <template #icon>
          <check-outlined />
        </template>
        确认上传
      </a-button>
    </a-row>
  </a-form>

    <a-col :span="24">
        <a-card size="small" :bordered="false" >
            <a-row class="smart-table-btn-block">
                <div class="smart-table-setting-block">
                    <TableOperator v-model="tableColumns"  :refresh="queryNoticeList" />
                </div>
            </a-row>
            <WaveForm/>
        </a-card>
    </a-col>
    <a-col :span="24">
        <a-card size="small" :bordered="false" >
            <a-row class="smart-table-btn-block">
                <div class="smart-table-setting-block">
                    <TableOperator v-model="tableColumns"  :refresh="queryNoticeList" />
                </div>
            </a-row>
            <Spectrum/>
        </a-card>
    </a-col>
  <a-row :gutter="[10, 10]">
<!--      <WaveForm/><WaveForm/>-->
<!--      <Spectrum/><Spectrum/>-->
<!--    <a-col :span="24">-->
<!--      <a-card size="small" :bordered="false" >-->
<!--        <WaveForm/><WaveForm/>-->

<!--      </a-card>-->
<!--        <a-card size="small" :bordered="false" >-->
<!--            <Spectrum/><Spectrum/>-->

<!--        </a-card>-->

<!--    </a-col>-->
  </a-row>
  <FilePreviewModal ref="filePreviewModalRef" />

  <a-modal v-model:visible="uploadModalFlag" title="上传文件" @onCancel="hideUploadModal" @ok="hideUploadModal">
    <FileUpload
        list-type="text"
        :maxUploadSize="5"
        buttonText="点击上传文件"
        :defaultFileList="[]"
        :multiple="true"
        :folder="FILE_FOLDER_TYPE_ENUM.COMMON.value"
    />
  </a-modal>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '/@/constants/common-const';
import VCascader from '/@/views/voice/manage/components/voice-manage-cascader.vue'
import { noticeApi } from '/@/api/business/oa/notice-api';
import { smartSentry } from '/@/lib/smart-sentry';
import WaveForm from '/@/components/voice/voice-waveform/index.vue';
import Spectrum from '/@/components/voice/voice-spectrum/index.vue';
import FilePreviewModal from '/@/components/support/file-preview-modal/index.vue';
import FileUpload from '/@/components/support/file-upload/index.vue';
import { FILE_FOLDER_TYPE_ENUM } from '/@/constants/support/file-const';




// ------------------ 通知分类 ------------------

// 查询分类列表
const noticeTypeList = ref([]);
async function queryNoticeTypeList() {
  try {
    const result = await noticeApi.getAllNoticeTypeList();
    noticeTypeList.value = result.data;
  } catch (err) {
    smartSentry.captureError(err);
  }
}

// ------------------ 查询相关 ------------------

const queryFormState = {
  noticeTypeId: undefined, //分类
  keywords: '', //标题、作者、来源
  publishTimeBegin: null, //发布-开始时间
  publishTimeEnd: null, //发布-截止时间
  notViewFlag: false, //未读
  pageNum: 1,
  pageSize: PAGE_SIZE,
};
const queryForm = reactive({ ...queryFormState });

const tableData = ref([]);
const total = ref(0);
const tableLoading = ref(false);

onMounted(() => {
  queryNoticeTypeList();
  queryNoticeList();
});

function changeNotViewFlag(value) {
  queryForm.notViewFlag = value === 0 ? null : true;
  onSearch();
}

// 查询列表
async function queryNoticeList() {
  try {
    tableLoading.value = true;
    const result = await noticeApi.queryEmployeeNotice(queryForm);
    tableData.value = result.data.list;
    total.value = result.data.total;
  } catch (err) {
    smartSentry.captureError(err);
  } finally {
    tableLoading.value = false;
  }
}
// ------------- 上传文件 --------------------
const uploadModalFlag = ref(false);

function showUploadModal() {
  uploadModalFlag.value = true;
}
function hideUploadModal() {
  uploadModalFlag.value = false;
  queryData();
}
// 点击查询
function onSearch() {
  queryForm.pageNum = 1;
  queryNoticeList();
}

// 点击重置
function onReload() {
  Object.assign(queryForm, queryFormState);
  publishDate.value = [];
  createDate.value = [];
  queryNoticeList();
}

// 发布日期选择
const publishDate = ref([]);
function publishDateChange(dates, dateStrings) {
  queryForm.publishTimeBegin = dateStrings[0];
  queryForm.publishTimeEnd = dateStrings[1];
}
// 创建日期选择
const createDate = ref([]);
function createDateChange(dates, dateStrings) {
  queryForm.createTimeBegin = dateStrings[0];
  queryForm.createTimeEnd = dateStrings[1];
}

// ------------------ 详情 ------------------

// 进入详情
const router = useRouter();
function toDetail(noticeId) {
  router.push({
    path: '/oa/notice/notice-employee-detail',
    query: { noticeId },
  });
}
</script>

<style lang="less" scoped>
.check-button{
  margin-left: 140px;
  background-color: @success-color;
  border-color: @success-color;
}
</style>
