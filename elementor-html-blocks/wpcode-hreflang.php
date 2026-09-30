<?php
/*
 * WPCode → Fragmento PHP · "Ejecutar en todas partes" (generado por build-seo.py)
 * - Etiquetas hreflang (es / en / x-default) en <head> de cada par de páginas.
 * - <html lang="en"> y og:locale en_GB en las páginas /en/...
 * Si se añade una página traducida: regenerar con build-seo.py y pegar de nuevo.
 */
if ( ! function_exists( 'oba_hreflang_pairs' ) ) {
    function oba_hreflang_pairs() {
        return array(
        '/' => '/en',
        '/restaurante' => '/en/restaurant',
        '/menu' => '/en/tasting-menu',
        '/entorno' => '/en/surroundings',
        '/nosotros' => '/en/about-us',
        '/huerto' => '/en/kitchen-garden',
        '/parajes' => '/en/manchuela',
        '/rawseason' => '/en/raw-season',
        '/pack-noche' => '/en/dinner-and-stay',
        '/eventos' => '/en/events',
        '/maridaje-natura' => '/en/natura-pairing',
        '/maridaje-matices-olvidados' => '/en/matices-olvidados-pairing',
        '/tienda' => '/en/gift-vouchers'
        );
    }
    function oba_current_path() {
        $path = wp_parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH );
        $path = '/' . trim( (string) $path, '/' );
        return $path;
    }
    function oba_is_english() {
        $p = oba_current_path();
        return $p === '/en' || strpos( $p, '/en/' ) === 0;
    }
    add_action( 'wp_head', function () {
        if ( is_404() ) { return; }
        $path  = oba_current_path();
        $pairs = oba_hreflang_pairs();
        if ( isset( $pairs[ $path ] ) ) {
            $es = $path;
        } else {
            $es = array_search( $path, $pairs, true );
            if ( false === $es ) { return; }
        }
        $site = 'https://obarestaurante.es';
        $es_url = $site . ( $es === '/' ? '/' : $es );
        $en_url = $site . $pairs[ $es ];
        echo '<link rel="alternate" hreflang="es" href="' . esc_url( $es_url ) . '" />' . "\n";
        echo '<link rel="alternate" hreflang="en" href="' . esc_url( $en_url ) . '" />' . "\n";
        echo '<link rel="alternate" hreflang="x-default" href="' . esc_url( $es_url ) . '" />' . "\n";
    }, 2 );
    add_filter( 'language_attributes', function ( $output ) {
        return oba_is_english() ? preg_replace( '/lang="[^"]*"/', 'lang="en"', $output ) : $output;
    } );
    add_filter( 'rank_math/opengraph/facebook/og_locale', function ( $locale ) {
        return oba_is_english() ? 'en_GB' : $locale;
    } );
}
