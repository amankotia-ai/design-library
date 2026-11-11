# Spring motion & damping

Compare bouncing, critical damping and overdamping through position, velocity and acceleration.

## Compare three arrivals

Use the three presets at the same natural frequency and initial displacement. Underdamping crosses the target; critical damping and overdamping return without oscillating for the displayed initial conditions. Increase damping above one to see how a return can become slower. Play once, scrub to an exact time, or reset to the initial comparison.

## Read the mathematics

The model solves x″ + 2ζω₀x′ + ω₀²x = 0, with x(0) = 1 and x′(0) = 0. Natural frequency is ω₀ = 2πf₀. For ζ < 1 the roots oscillate; ζ = 1 gives x(t) = (1 + ω₀t)e^(−ω₀t); ζ > 1 gives two real decaying modes. The equation displayed in the example follows the selected regime.

Position, velocity and acceleration come from the same analytic solution. A target crossing can still have substantial velocity. A nonoscillating return does not automatically give a short settling time. The comparison holds frequency and initial conditions fixed; it is not a general claim about every spring or edit.

## Reuse the functions

Download `film-motion-math.js` from References. `springState({time, damping, frequency, amplitude})` accepts nonnegative time and damping, positive natural frequency in Hz, and finite initial displacement. It returns displacement, velocity, acceleration and the selected regime. Velocity starts at zero. Negative initial displacement is supported. Units follow the chosen displacement scale.

Every seek evaluates the closed form rather than integrating frame by frame. Playback is opt-in and pauses when you change parameters or leave the visible workbench.

## Evidence and interpretation

These are authored teaching models. The checks cover initial conditions, the differential equation, derivatives and behavior near critical damping. They do not establish emotional impact or audience comprehension.
