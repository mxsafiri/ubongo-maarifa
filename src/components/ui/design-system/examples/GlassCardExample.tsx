import React from 'react';
import { GlassCard } from '../GlassCard';

export const GlassCardExample = () => {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      <GlassCard>
        <h3 className="mb-2 text-xl font-semibold text-white">Default Card</h3>
        <p className="text-gray-200">
          This is a default glass card with a beautiful frosted glass effect.
        </p>
      </GlassCard>

      <GlassCard variant="hover">
        <h3 className="mb-2 text-xl font-semibold text-white">Hover Card</h3>
        <p className="text-gray-200">
          This card has a hover effect that makes it slightly lighter.
        </p>
      </GlassCard>

      <GlassCard variant="active">
        <h3 className="mb-2 text-xl font-semibold text-white">Active Card</h3>
        <p className="text-gray-200">
          This card appears in an active state with higher opacity.
        </p>
      </GlassCard>
    </div>
  );
};
