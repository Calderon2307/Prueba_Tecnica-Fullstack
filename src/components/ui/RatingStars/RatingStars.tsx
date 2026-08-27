interface RatingStarsProps {
  rating: number;
  count: number;
}

interface StarIconProps {
  className?: string;
}

const MAX_RATING: number = 5;

const StarIcon = ({ className }: StarIconProps) => {
  return (
    <svg viewBox={"0 0 24 24"} className={className} aria-hidden={"true"}>
      <path
        d="M12 2.5 14.94 8.46 21.52 9.42 16.76 14.06 17.88 20.61 12 17.52 6.12 20.61 7.24 14.06 2.48 9.42 9.06 8.46 12 2.5Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RatingStars = ({ rating, count }: RatingStarsProps) => {
  const safeRating = Number.isFinite(rating)
    ? Math.min(Math.max(rating, 0), MAX_RATING)
    : 0;

  const normalizedRating = Math.round(safeRating * 10) / 10;

  const accessibleLabel =
    count !== undefined
      ? `${normalizedRating.toFixed(1)} de ${MAX_RATING} estrellas, ${count} valoraciones`
      : `${normalizedRating.toFixed(1)} de ${MAX_RATING} estrellas`;

  return (
    <div
      role={"img"}
      aria-label={accessibleLabel}
      className={`inline-flex flex-col items-center gap-2 text-foreground`}
    >
      <div className={`flex items-baseline gap-1`}>
        <span className={`font-heading text-2xl font-semibold leading-none`}>
          {normalizedRating.toFixed(1)}
        </span>

        <span className={`font-body text-sm text-foreground`}>
          / {MAX_RATING}
        </span>
      </div>

      <div className={`flex items-center gap-1`} aria-hidden={"true"}>
        {Array.from({ length: MAX_RATING }, (_, index) => {
          const fillPercentage = Math.min(
            Math.max((normalizedRating - index) * 100, 0),
            100,
          );

          return (
            <span key={index} className={`relative block size-7 shrink-0`}>
              <StarIcon className="absolute inset-0 size-7 fill-transparent stroke-current text-foreground/30" />
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <StarIcon className="block size-7 max-w-none fill-current stroke-current text-accent" />
              </span>
            </span>
          );
        })}
      </div>
      {count !== undefined && (
        <span className={`font-body text-sm text-foreground`}>
          ({count} ratings)
        </span>
      )}
    </div>
  );
};
