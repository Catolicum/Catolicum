// hooks/useWishlist.js
// Hook para gestionar la wishlist del usuario en Supabase

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useWishlist(user) {
  const [wishlist, setWishlist] = useState([]); // array de libro_slug
  const [loading, setLoading] = useState(false);

  // Cargar wishlist al hacer login
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    supabase
      .from("wishlist")
      .select("libro_slug")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setWishlist(data ? data.map((r) => r.libro_slug) : []);
        setLoading(false);
      });
  }, [user]);

  // Comprobar si un libro está en wishlist
  const isInWishlist = useCallback(
    (slug) => wishlist.includes(slug),
    [wishlist]
  );

  // Añadir libro a wishlist
  const addToWishlist = useCallback(
    async (libro) => {
      if (!user) return { error: "not_logged_in" };
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        libro_slug: libro.slug,
        libro_titulo: libro.titulo,
        libro_autor: libro.autor,
        libro_puntuacion: libro.puntuacion,
      });
      if (!error) {
        setWishlist((prev) => [...prev, libro.slug]);
      }
      return { error };
    },
    [user]
  );

  // Quitar libro de wishlist
  const removeFromWishlist = useCallback(
    async (slug) => {
      if (!user) return;
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("libro_slug", slug);
      setWishlist((prev) => prev.filter((s) => s !== slug));
    },
    [user]
  );

  // Toggle
  const toggleWishlist = useCallback(
    async (libro) => {
      if (!user) return { error: "not_logged_in" };
      if (isInWishlist(libro.slug)) {
        await removeFromWishlist(libro.slug);
        return { added: false };
      } else {
        const result = await addToWishlist(libro);
        return { added: !result.error, ...result };
      }
    },
    [user, isInWishlist, addToWishlist, removeFromWishlist]
  );

  return { wishlist, loading, isInWishlist, toggleWishlist, removeFromWishlist };
}
