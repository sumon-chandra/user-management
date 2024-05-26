import { supabase } from "@/utils/supabase";

export async function uploadAvatar(file: File) {
  if (!file) {
    throw new Error("No file provided");
  }

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`${(file.name, "_", new Date())}`, file, {
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
