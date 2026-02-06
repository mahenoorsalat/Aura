import React from 'react';
import { cn } from "@/lib/utils";

interface AuraCardProps {
    children: React.ReactNode;
    className?: string;
    span?: 'small' | 'medium' | 'large' | 'tall' | 'wide' | 'full';
    onClick?: () => void;
}

const AuraCard: React.FC<AuraCardProps> = ({ children, className, span = 'medium', onClick }) => {
    const spanClasses = {
        small: 'col-span-3',
        medium: 'col-span-4',
        large: 'col-span-8',
        tall: 'col-span-3 row-span-2',
        wide: 'col-span-6',
        full: 'col-span-12',
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "aura-slab flex flex-col group relative overflow-hidden",
                spanClasses[span],
                onClick && "cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
};

export default AuraCard;
