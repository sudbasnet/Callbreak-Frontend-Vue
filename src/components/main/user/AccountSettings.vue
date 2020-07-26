<template>
  <div id="account-settings">
    <div>
      <button>Change Email</button>
      <form>
        <label for="new-email">Email</label>
        <input type="text" name="new-email" />
      </form>
    </div>

    <div>
      <button>Change Password</button>
      <form>
        <div>
          <label for="password">Current Password</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input type="password" name="newPassword" />
        </div>
        <div>
          <label for="confirmNewPassword">Confirm Password</label>
          <input type="password" name="confirmNewPassword" />
        </div>
      </form>
    </div>
    <div>
      Verify Account
      <a href="#">Send Verification Email</a>
    </div>

    <div>
      Deactivate Account
      <button>Deactivate</button>
    </div>

    <div>
      Delete Account (Permanent Action)
      <button>Delete Account</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#account-settings {
  display: grid;
  row-gap: 20px;
}
</style>