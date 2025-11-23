"use client";

import { useEffect, useState } from "react";
import {
  ExerciseTemplateSchemaType,
} from "../schema/exerciseTemplate.schema";
import { fetchExerciseTemplates } from "../services/exerciseTemplate.services";

export function useExerciseTemplates() {
  const [templates, setTemplates] = useState<ExerciseTemplateSchemaType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchExerciseTemplates();

        if (active) {
          setTemplates(data);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || "Failed to load templates");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return {
    templates,
    loading,
    error,
  };
}
