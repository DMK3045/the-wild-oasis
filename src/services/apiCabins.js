import supabase, { supabaseUrl } from './superBase';
// A. GET ALL CABINS
export async function getCabins() {
  let { data, error } = await supabase.from('Cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Failed to load the cabins');
  }
  return data;
}

// B. DELETE A CABIN

export async function deleteCabin(id) {
  const { error } = await supabase.from('Cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Failed to delete the cabins');
  }
}

// C. CREATE A CABIN

export async function createCabin(newCabin) {
  // https://qomaddtvkcrsslptgqdj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //image data converstion
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName =
    !hasImagePath && newCabin.image
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
      : null;

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a new cabine
  const { data, error } = await supabase
    .from('Cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error('Failed to create a new cabin');
  }

  // 2. Upload image if there is no error in creating the cabin
  if (hasImagePath) return data;
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image

  if (error) {
    await supabase.from('Cabins').delete().eq('id', data.id);
    console.log(imageError);
    throw new Error(
      'Cabin Image could not be uploaded. Cabin was not created!'
    );
  }

  return data;
}

// D. UPDATE A CABIN
export async function editCabin(newCabin, id) {
  console.log('from the api', newCabin.image);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Only create a new image name if a new file is provided
  const imageName =
    !hasImagePath && newCabin.image
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
      : null;

  // Set imagePath only if a new file is uploaded; otherwise, keep the existing path
  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image; // Keep the original image path if no new file is provided

  // Update the selected cabin with the new or existing image path
  const { data, error } = await supabase
    .from('Cabins')
    .update({ ...newCabin, image: imagePath })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
    throw new Error('Failed to update the cabin');
  }

  // Upload new image only if `newCabin.image` is a new file and not an existing path
  if (!hasImagePath && newCabin.image) {
    const { error: imageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (imageError) {
      await supabase.from('Cabins').delete().eq('id', data.id);
      console.log(imageError);
      throw new Error(
        'Cabin image could not be uploaded. Cabin was not updated!'
      );
    }
  }

  return data;
}
