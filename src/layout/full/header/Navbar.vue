<template>
  <header class="gridx">
    <vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="rgba(255,255,255,1)"
    >
      <!---
      Template logo
      -->
      <div slot="title" class="themelogo">
        <!-- <img :src="logo" v-if="logo" alt="Dashboard" /> -->
        <span class="logo-text" v-if="title">{{ title }}</span>
      </div>
      <!---
      Mobile toggle
      -->
      <div slot="title">
        <div class="hiddenDesktop cursor-pointer" @click.stop="activeSidebar">
          <vs-icon icon="menu"></vs-icon>
        </div>
      </div>
      <!---
      Desktop Toggle
      -->
      <div
        class="hiddenMobile cursor-pointer"
        @click="reduceSidebar"
        v-show="!showToggle"
      >
        <vs-icon icon="menu"></vs-icon>
      </div>
      <div
        class="hiddenMobile cursor-pointer"
        @click="fullSidebar"
        v-show="showToggle"
      >
        <vs-icon icon="menu"></vs-icon>
      </div>
      <!---
      Craete new dd
      -->
      <vs-dropdown vs-trigger-click class="cursor-pointer ml-md-4">
        <a class="small-icon text-white-dark" href="#">
          {{ getCurrentLanguage.lang }}
          <vs-icon icon="expand_more"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <vs-dropdown-item @click="changeLanguage('en')"
            >English</vs-dropdown-item
          >
          <vs-dropdown-item @click="changeLanguage('fr')"
            >French</vs-dropdown-item
          >
          <vs-dropdown-item @click="changeLanguage('ch')"
            >Chinese</vs-dropdown-item
          >
          <vs-dropdown-item @click="changeLanguage('gr')"
            >German</vs-dropdown-item
          >
        </vs-dropdown-menu>
      </vs-dropdown>

      <vs-spacer></vs-spacer>
      <!---
      Search new dd
      -->
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#" href.prevent>
          <vs-icon icon="search"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <div class="p-2 m-1">
            <vs-input
              class
              placeholder="Search & hit enter"
              v-model="searchvalue"
            />
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>

      <!---
      New mail Dropdown
      -->
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#">
          <vs-icon icon="notifications"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">
          <div class="drop-title bg-info p-3 text-white">
            <h4 class="mb-0 mt-1">{{ mails.length }} New</h4>
            <span class="font-light">Mails</span>
          </div>
          <div v-bar class="vs-scrollable" style="height: 200px;">
            <div>
              <vs-dropdown-item
                class="message-center overflow-auto position-relative"
                v-for="mail in mails"
                :mail="mail"
                :key="mail.mailtitle"
              >
                <!-- Message -->
                <a href="javascript:void(0)" class="d-flex align-items-center">
                  <vs-button
                    radius
                    color
                    :class="[mail.btnbg]"
                    type="filled"
                    :icon="mail.btnicon"
                  ></vs-button>
                  <div
                    class="mail-contnet d-inline-block w-75 pl-2 align-middle"
                  >
                    <h6 class="message-title mt-1">{{ mail.mailtitle }}</h6>
                    <span
                      class="mail-desc d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ mail.maildesc }}</span
                    >
                    <span
                      class="time d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ mail.mailtime }}</span
                    >
                  </div>
                </a>
              </vs-dropdown-item>
            </div>
          </div>
          <div>
            <a
              class="d-block text-center text-dark p-3"
              href="javascript:void(0);"
            >
              <strong>Check all Mails</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      <!---
      New Messages Dropdown
      -->
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#">
          <vs-icon icon="mode_comment"></vs-icon>
          <span
            class="dot-count vs-avatar--count badgeNumber dot-count-danger"
            >{{ chats.length }}</span
          >
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">
          <div class="drop-title bg-danger p-3 text-white">
            <h4 class="mb-0 mt-1">{{ chats.length }} New</h4>
            <span class="font-light">Messages</span>
          </div>
          <div v-bar class="vs-scrollable" style="height: 200px;">
            <div>
              <vs-dropdown-item
                class="message-center overflow-auto position-relative"
                v-for="chat in chats"
                :chat="chat"
                :key="chat.chattitle"
              >
                <!-- Message -->
                <a href="javascript:void(0)" class="d-flex align-items-center">
                  <span class="user-img position-relative d-inline-block">
                    <img
                      :src="require('@/assets/images/users' + chat.img)"
                      alt="user"
                      class="rounded-circle"
                    />
                    <span
                      class="profile-status pull-right d-inline-block position-absolute"
                      :class="[chat.userstatus]"
                    ></span>
                  </span>
                  <div
                    class="mail-contnet d-inline-block w-75 pl-2 align-middle"
                  >
                    <h6 class="message-title mt-1">{{ chat.msgtitle }}</h6>
                    <span
                      class="mail-desc d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ chat.msgdesc }}</span
                    >
                    <span
                      class="time d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ chat.msgtime }}</span
                    >
                  </div>
                </a>
              </vs-dropdown-item>
            </div>
          </div>
          <div>
            <a
              class="d-block text-center text-dark p-3"
              href="javascript:void(0);"
            >
              <strong>Check all messages</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      <!---
      Craete new dd
      -->
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3"
      >
        <a class="text-white-dark user-image" href="#">
          <img src="@/assets/images/users/1-old.jpg" alt="User" />
        </a>
        <vs-dropdown-menu class="user-dd common-dd topbar-dd">
          <div v-for="user in users" :user="user" :key="user.usertitle">
            <div
              class="d-flex align-items-center p-3 bg-danger text-white mb-2"
            >
              <div class>
                <img
                  :src="require('@/assets/images/users' + user.img)"
                  alt="user"
                  class="rounded-circle"
                  width="60"
                />
              </div>
              <div class="ml-2">
                <h4 class="mb-0 text-white">{{ user.name }}</h4>
                <p class="mb-0">{{ user.email }}</p>
              </div>
            </div>

            <vs-dropdown-item>
              <vs-icon icon="person_outline" class="mr-1"></vs-icon>
              {{ user.dditem1 }}
            </vs-dropdown-item>
            <vs-dropdown-item>
              <vs-icon icon="sentiment_very_satisfied" class="mr-1"></vs-icon>
              {{ user.dditem2 }}
            </vs-dropdown-item>
            <vs-dropdown-item>
              <vs-icon icon="mail_outline" class="mr-1"></vs-icon>
              {{ user.dditem3 }}
            </vs-dropdown-item>

            <hr class="mb-1" />
            <vs-dropdown-item>
              <vs-icon icon="gps_not_fixed" class="mr-1"></vs-icon>
              {{ user.dditem4 }}
            </vs-dropdown-item>
            <hr class="mt-1" />
            <vs-button
              color="danger"
              type="filled"
              size="small"
              class="rounded-button ml-3 mb-3"
              >Logout</vs-button
            >
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-navbar>
  </header>
</template>

<script>
import themeConfig from "@/../themeConfig.js";

export default {
  name: "Navbar",
  props: {
    topbarColor: {
      type: String,
      default: themeConfig.topbarColor,
    },
    title: {
      type: String,
    },
    logo: {
      type: String,
    },
    // Obj for Userdropdown
    user: Object,
    // Obj for Mail Dropdown
    mail: Object,
    // Obj for Chat Dropdown
    chat: Object,
  },
  data: () => ({
    indexActive: 0,
    showToggle: false,
    searchvalue: "",
    // Data For User Dropdown
    users: [
      {
        img: "/3.jpg",
        name: "Steave Jobs",
        email: "varun@gmail.com",
        dditem1: "My Profile",
        dditem2: "My Balance",
        dditem3: "Inbox",
        dditem4: "Account Setting",
      },
    ],
    // Data For Mailbox
    mails: [
      {
        btnbg: "vs-button-primary",
        btnicon: "question_answer",
        mailtitle: "Luanch Admin",
        maildesc: "Just see the my new admin!",
        mailtime: "9:30 AM",
      },
      {
        btnbg: "vs-button-success",
        btnicon: "calendar_view_day",
        mailtitle: "Event today",
        maildesc: "Just a reminder that you have event",
        mailtime: "9:10 AM",
      },
      {
        btnbg: "vs-button-warning",
        btnicon: "perm_data_setting",
        mailtitle: "Settings",
        maildesc: "You can customize this template as you want",
        mailtime: "9:08 AM",
      },
      {
        btnbg: "vs-button-danger",
        btnicon: "face",
        mailtitle: "Pavan kumar",
        maildesc: "Just see the my admin!",
        mailtime: "9:02 AM",
      },
    ],
    // Data For Chats
    chats: [
      {
        img: "/3.jpg",
        userstatus: "online",
        msgtitle: "Pavan kumar",
        msgdesc: "Just see the my admin!",
        msgtime: "9:30 AM",
      },
      {
        img: "/1.jpg",
        userstatus: "busy",
        msgtitle: "Sonu Nigam",
        msgdesc: "I have sung a song! See you at",
        msgtime: "9:10 AM",
      },
      {
        img: "/2.jpg",
        userstatus: "away",
        msgtitle: "Arijit Sinh",
        msgdesc: "I am a singer!",
        msgtime: "9:08 AM",
      },
      {
        img: "/3.jpg",
        userstatus: "away",
        msgtitle: "Arijit Sinh",
        msgdesc: "I am a singer!",
        msgtime: "9:08 AM",
      },
      {
        img: "/4.jpg",
        userstatus: "offline",
        msgtitle: "Pavan kumar",
        msgdesc: "Just see the my admin!",
        msgtime: "9:30 AM",
      },
    ],
  }),

  methods: {
    //This is for sidebar trigger in mobile
    activeSidebar() {
      this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", true);
    },
    //This is for sidebar trigger in Desktop
    reduceSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", true);
      this.$store.dispatch("updateSidebarWidth", "mini");
      this.showToggle = true;
    },
    fullSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", false);
      this.$store.dispatch("updateSidebarWidth", "default");
      this.showToggle = false;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  },
  computed: {
    getCurrentLanguage() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { lang: "English" };
      else if (locale == "fr") return { lang: "French" };
      else if (locale == "ch") return { lang: "Chinese" };
      else if (locale == "gr") return { lang: "German" };
      return this.locale;
    },
  },
};
</script>
