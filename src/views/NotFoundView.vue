<template>
    <div class="not-found">
        <div class="container">
            <AppTitle :text="'404'" :textColor="'darkText'" :type="'h1'"/>
            <AppTitle :text="'Page not found'" :textColor="'darkText'" :type="'h1'"/>
            <AppButton :type="'link'" :to="'/'" :btnTitle="'Home page'" :btnClass="'sample'"/>
            </div>
        </div>
</template>

<script>
import AppTitle from '../UI/AppTitle.vue'
import AppButton from '../UI/AppButton.vue'

export default {
    components: { AppTitle, AppButton }
}
</script>