<template>
  <div>
    <template v-for="menu in menuData" >
      <el-submenu v-if="menu.children" :index="menu.menuUrl" :key="menu.menuUrl">
        <template slot="title">
          <img class="ic-menu" :src="require(`./icons/${menu.icon}${menu.id === curMenu.id ? '_on' : ''}.png`)"/>
          {{menu.menuName}}
        </template>
        <MenuTree :menuData="menu.children"></MenuTree>
      </el-submenu>
      <li 
        class="el-menu-item" 
        v-else-if="/^http(s)?:\/\/.+/i.test(menu.menuUrl)" 
        :index="''+menu.id" 
        :key="menu.id"
        >
        
        <a class="menu-text" :href="menu.menuUrl" target="_blank">
          <img class="ic-menu" :src="require(`./icons/${menu.icon}${menu.id === curMenu.id ? '_on' : ''}.png`)"/>
          {{menu.menuName}}
        </a>
      </li>
      <el-menu-item 
        v-else 
        :route="menu.menuUrl" 
        :index="menu.menuUrl" 
        :key="menu.id"
        >
        
        <img class="ic-menu" :src="require(`./icons/${menu.icon}${menu.id === curMenu.id ? '_on' : ''}.png`)"/>
        {{menu.menuName}}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      menuData: Array,
      curMenu:{
        type: Object,
        default: () => { return {}}
      }
    },
    name: 'MenuTree',
    
    data(){
      return {
      }
    },
    
    created(){
    }
  }
</script>
<style scope lang="scss">
.el-menu{background: none;}
.el-menu-item, .el-submenu__title{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 50px;
  line-height: 50px;
  font-size: 16px;;
  padding:0 12px !important;
  &:active, &:hover, &:focus{
    background-color: #2777FF;
  }
  .ic-menu{
    width:18px; 
    height:18px; 
    margin-right: 12px;
  }
  .menu-text{
    display: block;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
  }
}
.el-menu-item.is-active{
  background-color: #2777FF;
}
.el-menu .el-button{
    color: inherit;
}
</style>