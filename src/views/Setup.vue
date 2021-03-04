<template>
    <div class="setup">
        <ol class="setup--list">
            <li class="setup--list-item">
                <span class="setup--heading">Select a Garden Size</span>
                <div class="setup--size-container">
                    <input type="radio" id="2x4" name="size" value="2x4">
                    <label for="2x4">2 x 4</label><br>
                    <input type="radio" id="3x5" name="size" value="3x5">
                    <label for="3x5">3 x 5</label><br>
                    <input type="radio" id="4x8" name="size" value="4x8">
                    <label for="4x8">4 x 8</label> 
                    <input type="radio" id="custom" name="size" value="custom">
                    <label for="custom">Custom</label>
                </div>
            </li>
            <li class="setup--list-item">
                <span class="setup--heading">Select Hardiness Zone</span>
            </li>
        </ol>
        <button>Start Planning</button>
    </div>
</template>

<script>
export default {
    name: "Setup"
}
</script>

<style lang="scss">

</style>>
