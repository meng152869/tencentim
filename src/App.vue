<template>
  <div id="app">
    <template v-if="!isLogin">
      <input type="text" v-model="form.userID" placeholder="请输入登录id" />
      <button @click="login">登录</button>
    </template>
    <template v-else>
      <input type="text" v-model="tongID" placeholder="请输入会话id" />
      <button title="创建会话" @click="handleAddButtonClick">
        会话
      </button>
    </template>
  </div>
</template>

<script>
import sideBar from "./components/side-bar/side-bar.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    sideBar,
  },
  data() {
    return {
      // 通话id
      tongID: "",
      form: {
        userID: "",
      },
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState({
      currentUserProfile: (state) => state.user.currentUserProfile,
      isLogin: (state) => state.user.isLogin,
      isSDKReady: (state) => state.user.isSDKReady,
      userID: (state) => state.user.userID,
      userSig: (state) => state.user.userSig,
      sdkAppID: (state) => state.user.sdkAppID,
    }),
  },
  methods: {
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
      // // SDK NOT READT
      // this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // // 被踢出
      // this.tim.on(this.TIM.EVENT.KICKED_OUT, this.onKickOut)
      // // SDK内部出错
      // this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // // 收到新消息
      // this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // // 会话列表更新
      // this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
      // // 群组列表更新
      // this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList)
      // // 网络监测
      // this.tim.on(this.TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange)
      // // 已读回执
      // this.tim.on(this.TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer)
      // // 黑名单更新
      // this.tim.on(this.TIM.EVENT.FRIEND_LIST_UPDATED, this.onFriendListUpdated)

      // this.tim.on(this.TIM.EVENT.FRIEND_APPLICATION_LIST_UPDATED, this.onFriendApplicationListUpdated)

      // this.tim.on(this.TIM.EVENT.FRIEND_GROUP_LIST_UPDATED, this.onFriendGroupListUpdated)
    },
    login() {
      this.tim
        .login({
          userID: this.form.userID,
          userSig: window.genTestUserSig(this.form.userID).userSig,
        })
        .then(() => {
          this.$store.commit("toggleIsLogin", true);
          this.$store.commit({
            type: "GET_USER_INFO",
            userID: this.form.userID,
            userSig: window.genTestUserSig(this.form.userID).userSig,
            sdkAppID: window.genTestUserSig("").SDKAppID,
          });
        })
        .catch((error) => {});
    },
    handleAddButtonClick() {
      if (this.tongID !== "@TIM#SYSTEM") {
        tim.getConversationProfile(`C2C${this.tongID}`).then(({ data }) => {
          console.log(data)
        });
      } else {
      }
      this.tongID = "";
    },
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false;
      this.$store.commit("toggleIsSDKReady", isSDKReady);
      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
            this.$store.commit("updateCurrentUserProfile", data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>
