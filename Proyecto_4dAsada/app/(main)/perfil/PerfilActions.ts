"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function degradarRolAction(userId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('perfiles')
        .update({
            tipo: 'comprador',
            verificado: false,
            url_comprobante: null
        })
        .eq('id', userId);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/perfil');
    return { success: true };
}
