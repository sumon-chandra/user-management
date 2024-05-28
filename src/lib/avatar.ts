import { supabase } from "@/utils/supabase";

export async function uploadAvatar(file: File) {
  if (!file) {
    throw new Error("No file provided");
  }

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${(file.name, "_", new Date().getTime())}`, file, {
      contentType: "image/*",
    });

  if (error) {
    console.log({ error });
    throw new Error("Failed to upload avatar");
  }

  const publicUrl = await supabase.storage
    .from("avatars")
    .getPublicUrl(data?.path!);

  return publicUrl.data.publicUrl;
}

export async function deleteAvatar(url: string) {
  try {
    const { error } = await supabase.storage.from("avatars").remove([url]);
    if (error) {
      throw error;
    }
    // console.log("Avatar deleted successfully : ", data);
  } catch (error) {
    console.error("Error deleting avatar:", error);
  }
}

export async function updateAvatar(oldUrl: string, file: File) {
  try {
    // First, delete the existing avatar
    if (oldUrl !== null) {
      await deleteAvatar(oldUrl);
    }

    // Then, upload the new avatar
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${(file.name, "_", new Date().getTime())}`, file, {
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const publicUrl = await supabase.storage
      .from("avatars")
      .getPublicUrl(data?.path!);

    // console.log("Avatar updated successfully : ", publicUrl.data);
    return publicUrl?.data?.publicUrl;
  } catch (error) {
    console.error("Error updating avatar:", error);
    return null;
  }
}
