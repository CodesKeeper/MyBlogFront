<script>
// import {onMounted, reactive, toRefs} from 'vue'
// import axios from 'axios'
//
// const base_url = "http://127.0.0.1:8000/api/lyb/"
//
// const state = reactive({
//     ly_list: [],
// })
//
// const getLyb = () => {
//     axios.get(base_url).then(res => {
//         state.ly_list = res.data;
//     }).catch(err => {
//         console.log(err);
//     })
// }
//
// onMounted(() => {
//     getLyb();
// })
//
// const ly_list = toRefs(state)


import {onMounted, reactive, toRefs} from 'vue'
import axios from 'axios'

export default {
    name: 'Lyb',
    setup() {
        let base_url = "http://127.0.0.1:8000/api/lyb/"

        const lyb_blank = {title: '', author: '', content: ''}
        const state = reactive({
            ly_list: [],
            lyb: Object.assign({}, lyb_blank)
        })
        const getLyb = () => {
            axios.get(base_url).then(res => {
                state.ly_list = res.data;
                state.lyb = Object.assign({}, lyb_blank)
            }).catch(err => {
                console.log(err);
            })
        }
        const editLyb = (item) => {
            state.lyb.url = item.url;
            state.lyb.title = item.title;
            state.lyb.author = item.author;
            state.lyb.content = item.content;
        };

        const saveLyb = () => {
            let newdata = {
                title: state.lyb.title,
                author: state.lyb.author,
                content: state.lyb.content,
            }
            if (state.lyb.url == "") {
                // 新增
                axios.post(base_url, newdata).then(() => {
                    getLyb();
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // 编辑
                axios.put(state.lyb.url, newdata).then(() => {
                    getLyb();
                }).catch(err => {
                    console.log(err);
                })
            }
        }

        const deleteLyb = (item) => {
            axios.delete(item.url).then(() => {
                getLyb();
            }).catch(err => {
                console.log(err);
            })
        }

        onMounted(() => {
            getLyb();
        })
        return {
            ...toRefs(state),
            editLyb,
            saveLyb,
            deleteLyb,
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-md-8">
            <table class="table">
                <thead>
                <tr>
                    <th>标题</th>
                    <th>作者</th>
                    <th>内容</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in ly_list" :key="item.url">
                    <td>{{ item.title }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.content }}</td>
                    <td>
                        <button class="btn btn-success" title="编辑" @click="editLyb(item)" style="margin: 0 10px">
                            <i class="glyphicon glyphicon-pencil"></i>
                        </button>
                        <button class="btn btn-danger" title="删除" @click="deleteLyb(item)">
                            <i class="glyphicon glyphicon-trash"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-4">
            <input type="hidden" v-model="lyb.url">
            <div class="form-group">
                <label for="title">标题：</label>
                <input type="text" id="title" class="form-control" v-model="lyb.title">
            </div>
            <div class="form-group">
                <label for="author">作者：</label>
                <input type="text" id="author" class="form-control" v-model="lyb.author">
            </div>
            <div class="form-group">
                <label for="content">留言内容：</label>
                <textarea class="form-control" id="content" rows="10" v-model="lyb.content"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-default" @click="saveLyb">确定</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
