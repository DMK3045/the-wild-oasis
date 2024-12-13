import supabase, { supabaseUrl } from './superBase';

export async function signUp({ fullname, password, email }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullname, avatar: '' } },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function updateUserData({ password, fullName, avatar }) {
  // 1 update password or email
  const updateData = {};
  if (password) {
    updateData.password = password;
  }
  if (fullName) {
    updateData.data = { fullName }; // Ensure `data` is properly nested
  }

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // 2. upload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. update the avatar

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    console.error(error2.message);
    throw new Error(error2.message);
  }

  return updatedUser;
}
